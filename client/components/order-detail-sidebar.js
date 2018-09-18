import React from 'react'
import {connect} from 'react-redux'
import {Panel, Button, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import "./components-style/order-detail-sidebar.css";

const mapStateToProps = state => {
  const {user} = state
  return {
    cart: user.cart
  }
}

function calculateTotal(cart) {
  let sum = 0
  for (let i = 0; i < cart.length; i++) {
    sum += (parseInt(cart[i].price) * parseInt(cart[i].quantity))
  }
  return sum
}

const OrderDetailsSidebar = props => {
  const {cart, handleCheckout, hideButton} = props
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
          <div id="order-detail-sidebar-total">
            <p id="order-detail-total">Grand Total: <span id="order-detail-total-number">${calculateTotal(cart)}</span></p>
          </div>
          <Link to="/checkout" className={hideButton ? "hide" : "show"}>
            <Button bsStyle="success" onClick={handleCheckout}>
              PROCEED TO CHECKOUT
            </Button>
          </Link>
        </Panel.Body>
      </Panel>
    </div>
  )
}

export default connect(mapStateToProps)(OrderDetailsSidebar)
