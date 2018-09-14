import React from 'react'
import { Panel } from 'react-bootstrap'

const CartSidebar = () => {
  return (
    <div id="sidebar">
      <div id="cart-order">
        <h2>Order</h2>
      </div>
      <Panel id="order-card">
        <Panel.Body>

        </Panel.Body>
      </Panel>
    </div>
  )
}

export default CartSidebar
