import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup} from './components'
import CartContainer from './components/cart/cart-container'
import AllProducts from './components/all-products'
import Categories from './components/categories'
import ProductDetail from './components/productDetail'
import {me} from './store'
import {getCart} from './store/user'
import CheckoutPage from './components/checkout-page'
import OrderHistory from './components/orderHistory'
import Inventory from './components/admin/inventory'
import UpdateInventory from './components/admin/updateItem'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    console.log(isLoggedIn)

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={CartContainer} />
        <Route path="/category/:id" component={AllProducts} />
        <Route path="/home" component={Categories} />
        <Route exact path="/" component={Categories} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/orders" component={OrderHistory} />
        {isLoggedIn && (
          <Switch>
          <Route path="/admin/inventory/update" component={UpdateInventory} />
          <Route path="/admin/inventory" component={Inventory} />
            {/* Routes placed here are only available after logging in */}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Categories} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    async loadInitialData() {
      const user = await dispatch(me())
      console.log('userInLoadInitialData', user);
      dispatch(getCart(user))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
