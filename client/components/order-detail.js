import React from 'react'
import { connect } from 'react-redux'
import CartCard from './cart/cart-card'

const OrderDetail = (props) => {
  const orderId = props.orderId
  const userOrder = props.orderHistory.filter(order => {
    return order.orderId === orderId
  })
  return (
    <div id="order-detail">
      <div id="order-title">
        <h2>Your Cart</h2>
      </div>
      <div id="order-grid">
        {userOrder.order_details.map(item => {
          return <CartCard key={item.id} item={item} />
        })}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    orderHistory: state.user.orderHistory
  }
}

export default connect(mapState)(OrderDetail)
