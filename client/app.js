import React, { Component } from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import { getItemsFromDb } from './store/products';

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getItemsFromDb())
  }
}

const mapStateToProps = state => {
  const { products } = state;
  return {
    products: products.allItems
  }
}

class App extends Component {
  async componentDidMount() {
    try {
      const { getProducts } = this.props;
      await getProducts();
      console.log('thunk run');
    }
    catch(err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
 }

export default connect(mapStateToProps, mapDispatchToProps)(App);
