import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {addItemToCartThunk} from '../store'

class SingleProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)
  }

  handleQuantityChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleAddItem(evt) {
    evt.preventDefault()
    addItemToCart(this.props.currentItem, this.state.quantity, this.props.user)
  }

  render() {
    if (!this.props.currentItem) return <div />
    return (
      <div>
        <div>{this.props.currentItem.name}</div>
        <div>{this.props.currentItem.price}</div>
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
    addItemToCart: (item, quantity, user) =>
      dispatch(addItemToCartThunk(item, quantity, user))
  }
}

export default connect(mapProps, mapDispatch)(SingleProductCard)
