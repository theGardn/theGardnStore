import React, {Component} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import {getItemsFromDb} from './store/products'
import {getCategories} from './store/categories'
import {getCart} from './store/user'
import {withRouter} from 'react-router-dom'
import './components/components-style/app.css';

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getItemsFromDb()),
    getCategories: () => dispatch(getCategories()),
  }
}

const mapStateToProps = state => {
  const {products, user} = state
  return {
    products: products.allItems,
    user: user
  }
}

class App extends Component {
  async componentDidMount() {
    try {
      const {getProducts} = this.props
      await getProducts()
    } catch (err) {
      console.error(err)
    }

    try {
      const {getCategories} = this.props
      await getCategories()
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div id='page-container'>
          <Routes />
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
