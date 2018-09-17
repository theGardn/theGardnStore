import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Grid, Row, Col} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import { setItem } from '../store/products'

// import { addItemToCartThunk } from '../store'
import SingleProductCard from './singleProductCard'

class ProductDetail extends React.Component {
  constructor(props){
    super(props)
    this.props.setItem(this.props.match.params.id)
  }

  componentDidMount() {
    // console.log('Component did mount!!')
    // this.props.setItem(this.props.match.params.id)
  }

  componentDidUpdate(){
  //   if(this.props.products && !this.props.currentItem) {
  //     this.props.setItem(this.props.match.params.id)
  //   }

  }

  findCurrentItem(itemId){
    if(this.props.products && !this.props.currentItem){
      // console.log('Products: ', this.props.products)
      // console.log('CurrentItem: ', this.props.currentItem)
    this.props.setItem(itemId)
    }
  }

  render() {
    // console.log('********Product details**********')
    // console.log(this.props.currentItem)
    // if(this.props.products && !this.props.currentItem){
      // console.log('Products: ', this.props.products)
      // console.log('CurrentItem: ', this.props.currentItem)
      this.findCurrentItem(this.props.match.params.id)
    // }

    // if(!this.props.currentItem.name) return <Redirect to='/home' />
    return (
      <div>
        { this.props.currentItem ? <SingleProductCard /> : <h3>Can Not Find the Product</h3> }
      </div>
    )
  }
}

const mapProps = state => {
  return {
    currentItem: state.products.currentItem,
    products: state.products.allItems,
    user: state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    // addItemToCart: (item, quantity, user) => dispatch(addItemToCartThunk(item, quantity, user))
    setItem: (itemId) => dispatch(setItem(itemId))
  }
}

export default withRouter(connect(mapProps, mapDispatch)(ProductDetail))
