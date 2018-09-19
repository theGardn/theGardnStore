import React from 'react'
import { connect } from 'react-redux'
import { Panel, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import "./components-style/order-detail-sidebar.css";
import {submitCheckoutThunk} from '../store/user';

const mapStateToProps = state => {
  const { user } = state
  return {
    cart: user.cart,
    user: user.user
  }
}

function calculateTotal(cart) {
  let sum = 0
  for (let i = 0; i < cart.length; i++) {
    console.log(cart[i].price, cart[i].quantity)
    sum += (parseFloat(cart[i].price).toFixed(2) * parseFloat(cart[i].quantity).toFixed(2))
  }
  return sum.toFixed(2)
}

const OrderDetailsSidebar = props => {
  const { cart, handleCheckout, hideButton, user } = props
  return (
    <div id="sidebar-container">
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h1" id="order-details-title">Order Details</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div id="order-detail-sidebar-item-list">
            <Table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => {
                  return (
                    <tr key={item.name} id="order-detail-sidebar-item">
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${parseFloat(item.price).toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
          {console.log(cart)}
          <div id="order-detail-sidebar-total">
            <p id="order-detail-total">Grand Total: <span id="order-detail-total-number">${calculateTotal(cart)}</span></p>
          </div>
          <Link to="/checkout" className={hideButton ? "hide" : "show"}>
            <Button bsStyle="success">
              PROCEED TO CHECKOUT
            </Button>
          </Link>
        </Panel.Body>
      </Panel>
    </div>
  )
}

export default connect(mapStateToProps)(OrderDetailsSidebar)
