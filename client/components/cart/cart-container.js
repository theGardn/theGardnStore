import React from 'react'
import { connect } from 'react-redux'
import CartDetail from './cart-detail'
import OrderDetailsSidebar from '../order-detail-sidebar'
import { PageHeader, Grid, Row, Col } from 'react-bootstrap'
import '../components-style/cart.css'

const CartContainer = (props) => {
  return (
    <div id="cart-container">
      <Grid>
        <Row>
          <div id="cart-title">
            <PageHeader>Cart</PageHeader>
          </div>
          <div id="cart-content">
            <Col xs={12} sm={8}>
              {
                (props.cart.length === 0) ? <h1>Your Cart Is Empty</h1> : <CartDetail cart={props.cart} />
              }
            </Col>
            <Col xs={12} sm={4}>
              <div id="order-details-sidebar-container">
                <OrderDetailsSidebar />
              </div>
            </Col>
          </div>
        </Row>
      </Grid>
    </div>
  )
}

const mapState = state => {
  return {
    cart: state.user.cart
  }
}

export default connect(mapState)(CartContainer)
