import numbro from 'numbro';
import fill from 'lodash/fill'
import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import AdLevel from '../../components/AdLevel/AdLevel'
import { viewActions } from '../../modules/checkout/actions'

import './Checkout.scss'

class Checkout extends Component {

  formatNumber = (number) => numbro(number).formatCurrency('0[.]00')

  handleAdd = (id) => {
    const { addAd } = this.props.actions;
    return () => addAd([id]);
  }

  renderAdLevel = (adLevel, deals, handleAdd) => (
    <Col key={adLevel.id} xs={4}>
      <AdLevel id={adLevel.id} name={adLevel.name} price={adLevel.price} deals={deals} onAdd={this.handleAdd(adLevel.id)}>
        {adLevel.features && adLevel.features.map((feat) => <li key={feat}>{feat}</li>)}
        <li key='0'></li>
      </AdLevel>
    </Col>
  )

  renerTotalLine = (id, name, value) => (
    <Col key={id} xs={12} className='total-line'>
      <span className='ad-name'>{name}</span>
      <span className='ad-price'>{this.formatNumber(value)}</span>
    </Col>
  )

  render() {
    const { deals, adLevels, actions, ads, total } = this.props;

    return (
      <div className='checkout'>
        <PageHeader>Ads Checkout</PageHeader>
        <div className='pricing-container'>
          <Col xs={6} sm={8}>
            {adLevels.map((adLevel) =>
              this.renderAdLevel(
                adLevel,
                deals.filter((deal) => (deal.adLevel == adLevel.id)),
                actions.add
              )
            )}
          </Col>
          <Col xs={6} sm={4}>
            <div className='total-container'>
              <div className='header'>Total</div>
              <div className='total-itens ads'>
                {(total && total.ads) &&
                  Object.keys(total.ads).map((ad) => this.renerTotalLine(total.ads[ad].id, total.ads[ad].name + ' x ' + total.ads[ad].quantity, total.ads[ad].total))
                }
              </div>
              <div className='total-itens subtotal'>
                {(total && total.subtotal) &&
                  this.renerTotalLine('subtotal', 'Subtotal', total.subtotal)
                }
              </div>
              <div className='total-itens discount'>
                {(total && total.discount) &&
                  this.renerTotalLine('discount', 'Discount', total.discount)
                }
              </div>
              <div className='total-itens total'>
                {(total && total.total) &&
                  this.renerTotalLine('total', 'Total', total.total)
                }
                {!(total && total.total) &&
                  this.renerTotalLine('total', 'Total', 0)
                }
              </div>
            </div>
            <div className='buttons'>
              <Button bsStyle='primary' className='check' onClick={actions.clearAds}>Checkout <Glyphicon glyph="send" /></Button>
            </div>
          </Col>
        </div>
      </div>
    )
  }
}

Checkout.propTypes = {
  deals: PropTypes.array.isRequired,
  ads: PropTypes.object.isRequired,
  adLevels: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    addAd: PropTypes.func.isRequired,
    removeAd: PropTypes.func.isRequired,
    clearAds: PropTypes.func.isRequired,
    getTotal: PropTypes.func.isRequired
  })
}

Checkout = connect(
  state => ({
    deals: state.auth.user.deals,
    adLevels: state.auth.user.adLevels,
    ads: state.checkout.ads,
    total: state.checkout.total
  }),
  dispatch => ({
    actions: bindActionCreators(viewActions, dispatch)
  })
)(Checkout)

export default Checkout
