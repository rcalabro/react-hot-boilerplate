import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import AdLevel from '../../components/AdLevel/AdLevel'
import { viewActions } from '../../modules/checkout/actions'

import './Checkout.scss'

class Checkout extends Component {

  handleAdd = (id) => {
    const { add } = this.props.actions;
    return () => add(id);
  }

  renderAdLevel = (adLevel, deals, handleAdd) => (
    <Col key={adLevel.id} xs={12} sm={6} md={4}>
      <AdLevel id={adLevel.id} name={adLevel.name} price={adLevel.price} deals={deals} onAdd={this.handleAdd(adLevel.id)}>
        {adLevel.features && adLevel.features.map((feat) => <li key={feat}>{feat}</li>)}
        <li key='0'></li>
      </AdLevel>
    </Col>
  )

  render() {
    const { deals, adLevels, actions } = this.props;

    return (
      <div className='checkout'>
        <PageHeader>Ads Checkout</PageHeader>
        <div className='container pricing-container'>
          {adLevels.map((adLevel) =>
            this.renderAdLevel(
              adLevel,
              deals.filter((deal) => (deal.adLevel == adLevel.id)),
              actions.add
            )
          )}
        </div>
      </div>
    )
  }
}

Checkout.propTypes = {
  deals: PropTypes.array.isRequired,
  adLevels: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    total: PropTypes.func.isRequired
  })
}

Checkout = connect(
  state => ({
    deals: state.auth.user.deals,
    adLevels: state.auth.user.adLevels
  }),
  dispatch => ({
    actions: bindActionCreators(viewActions, dispatch)
  })
)(Checkout)

export default Checkout
