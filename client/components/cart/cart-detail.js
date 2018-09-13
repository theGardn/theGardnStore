import React, { Component } from 'react'
import { connect } from 'react-redux'

class CartDetail extends Component {
  render() {
    const { cart } = this.props
    console.log('cart', cart)
    return (
      <div id="cart-detail">
        <h2>Your Cart</h2>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.user.cart
  }
}

export default connect(mapState)(CartDetail)

