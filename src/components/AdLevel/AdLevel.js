import React, { PropTypes, Component } from 'react'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

import './AdLevel.scss'

class AdLevel extends Component {

  render() {
    const { id, name, price, deals, children, onAdd, onAddDeal } = this.props;
    const discount = deals.filter((deal) => (deal.type === 'discount'))[0];
    const bundle = deals.filter((deal) => (deal.type === 'bundle'))[0];
    const bundleDiscount = deals.filter((deal) => (deal.type === 'bundle-discount'))[0];

    return (
      <div className='ad-level'>
        <div className='header'>{name}</div>
        {discount &&
          <div>
            <span className='discount-label'>Especial client discount!</span>
            <div>
              <div className='price discount'>${price} </div>
              <div className='price'>${discount.price}</div>
            </div>
          </div>
        }
        {!discount &&
          <div className='price'>${price}</div>
        }
        {bundle &&
          <div className='deal'>
            <span className='deal-label'>Especial client deal!</span>
            <span>gets {bundle.get} for {bundle.for}</span>
            <div>
              <div className='deal-price-red'>${bundle.get * price} </div>
              <div className='deal-price'>${bundle.for * price}</div>
            </div>
          </div>
        }
        {bundleDiscount &&
          <div className='deal'>
            <span className='deal-label'>Especial client deal!</span>
            <span>get a discount on {bundleDiscount.over} or more</span>
            <div>
              <div className='deal-price-red'>${price} </div>
              <div className='deal-price'>${bundleDiscount.price}</div>
            </div>
          </div>
        }
        {children &&
          <ul>
            {children}
          </ul>
        }
        <div className='add'>
          <div>
            <Button bsStyle='link' onClick={onAdd}><Glyphicon glyph="plus" /> Add</Button>
          </div>
        </div>
      </div>
    )
  }
}

AdLevel.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  deals: PropTypes.array,
  children: PropTypes.array,
  onAdd: PropTypes.func
}


export default AdLevel
