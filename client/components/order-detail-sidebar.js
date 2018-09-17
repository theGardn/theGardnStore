import React from 'react'
import {connect} from 'react-redux'
import {Panel, Button} from 'react-bootstrap'

const mapStateToProps = state => {
  const {user} = state
  return {
    cart: user.cart
  }
}

function calculateTotal(cart) {
  let sum = 0
  for (let i = 0; i < cart.length; i++) {
    sum += parseInt(cart[i].price)
  }
  return sum
}

const OrderDetailsSidebar = props => {
  const {cart, handleCheckout} = props
  return (
    <div>
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h1">Order Details</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div id="order-detail-sidebar-item-list">
            {cart.map(item => {
              return (
                <div>
                  <p>{item.name}</p>
                </div>
              )
            })}
          </div>
          <div id="order-detail-sidebar-total">
            <h3 id="order-detail-total">${calculateTotal(cart)}</h3>
          </div>
          <Button bsStyle="success" onClick={handleCheckout}>
            PROCEED TO CHECKOUT
          </Button>
        </Panel.Body>
      </Panel>
    </div>
  )
}

export default connect(mapStateToProps)(OrderDetailsSidebar)
