import React, {Component} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import {getItemsFromDb} from './store/products'
import {getCategories} from './store/categories'
import {withRouter} from 'react-router-dom'

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getItemsFromDb()),
    getCategories: () => dispatch(getCategories())
  }
}

const mapStateToProps = state => {
  const {products} = state
  return {
    products: products.allItems
  }
}

class App extends Component {
  async componentDidMount() {
    try {
      const {getProducts} = this.props
      await getProducts()
      console.log('thunk run')
    } catch (err) {
      console.error(err)
    }

    try {
      const {getCategories} = this.props
      await getCategories()
      console.log('thunk run')
    } catch (err) {
      console.err(err)
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
