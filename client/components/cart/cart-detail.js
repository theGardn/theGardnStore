import React, { Component } from 'react'
import CartCard from './cart-card';

const CartDetail = (props) => {
  const { cart } = props
  return (
    <div id="cart-detail">
      <div id="cart-title">
        <h2>Your Cart</h2>
      </div>
      <div id="cart-grid">
        {
          cart.map(item => {
            return (
              <CartCard key={item.id} item={item} />
            )
          })
        }
      </div>
    </div>
  )
}

export default CartDetail

