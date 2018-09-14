import React, {connect} from 'react'
import CartDetail from './cart-detail'
import OrderDetailsSidebar from '../order-detail-sidebar'
import {PageHeader} from 'react-bootstrap'
import '../components-style/cart.css'

const cartDummy = [
  {
    id: 1,
    name: 'apples',
    categoryId: 1,
    price: 1.0,
    quantity: 10,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Honeycrisp.jpg/440px-Honeycrisp.jpg'
  },
  {
    id: 2,
    name: 'bananas',
    categoryId: 1,
    price: 0.6,
    quantity: 20,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Banana_and_cross_section.jpg/500px-Banana_and_cross_section.jpg'
  },
  {
    id: 3,
    name: 'grapes',
    categoryId: 1,
    price: 1.5,
    quantity: 40,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Abhar-iran.JPG/340px-Abhar-iran.JPG'
  },
  {
    id: 4,
    name: 'oranges',
    categoryId: 1,
    price: 2.0,
    quantity: 25,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Orange-Whole-%26-Split.jpg/440px-Orange-Whole-%26-Split.jpg'
  }
]

const CartContainer = () => {
  return (
    <div id="cart-container">
      <div id="cart-title">
        <PageHeader>Cart</PageHeader>
      </div>
      <div id="cart-content">
        <CartDetail cart={cartDummy} />
        <OrderDetailsSidebar />
      </div>
    </div>
  )
}

export default CartContainer
