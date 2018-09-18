import React, {Component} from 'react'
import CartCard from './cart-card'

const CartDetail = props => {
  const {cart} = props
  return cart.length > 0 ? (
    <div id="cart-detail">
      <div id="cart-title">
        <h2>Your Cart</h2>
      </div>
      <div id="cart-grid">
        {cart.map(item => {
          return (
            <div key={item.id}>
              <CartCard item={item} />
            </div>
          )
        })}
      </div>
    </div>
  ) : null;
}

export default CartDetail
