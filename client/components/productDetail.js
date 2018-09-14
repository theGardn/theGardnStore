import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Grid, Row, Col} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

// import { addItemToCartThunk } from '../store'
import SingleProductCard from './singleProductCard'

class ProductDetail extends React.Component {
  componentDidMount() {
    // console.log('Component did mount!!')
  }

  render() {
    // console.log('********Product details**********')

    // if(!this.props.currentItem.name) return <Redirect to='/home' />
    return (
      <div>
        <div>productDetail</div>
        <SingleProductCard />
        <div>
          <h2>Related product list goes here</h2>
        </div>
      </div>
    )
  }
}

const mapProps = state => {
  return {
    currentItem: state.products.currentItem,
    user: state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    // addItemToCart: (item, quantity, user) => dispatch(addItemToCartThunk(item, quantity, user))
  }
}

export default withRouter(connect(mapProps, mapDispatch)(ProductDetail))
