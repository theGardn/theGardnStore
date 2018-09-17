import React from 'react'
import { connect } from 'react-redux'
import CartDetail from './cart-detail'
import OrderDetailsSidebar from '../order-detail-sidebar'
import { PageHeader } from 'react-bootstrap'
import '../components-style/cart.css'

const CartContainer = (props) => {
  return (
    <div id="cart-container">
      <div id="cart-title">
        <PageHeader>Cart</PageHeader>
      </div>
      <div id="cart-content">
        {
          (props.cart.length === 0) ? <h1>Your Cart is empy</h1> : <CartDetail cart={props.cart} />
        }
        <OrderDetailsSidebar />
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    cart: state.user.cart
  }
}

export default connect(mapState)(CartContainer)
