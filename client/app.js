import React, {Component} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import {getItemsFromDb} from './store/products'
import {withRouter} from 'react-router-dom'
import './components/components-style/app.css';

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getItemsFromDb())
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
