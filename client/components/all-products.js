import React from 'react'
import {connect} from 'react-redux'
import SimpleCard from './simple-card'
import {withRouter} from 'react-router-dom'
import {setItem} from '../store/products'

export const AllProducts = props => {
  const {products, setCurrentItem} = props
  return (
    <React.Fragment>
      {products.map(item => {
        if (item.categoryId === Number(props.match.params.id)) {
          return (
            <SimpleCard
              key={item.id}
              name={item.name}
              imageUrl={item.imageUrl}
              price={item.price}
              id={item.id}
              onClick={setCurrentItem(item.id)}
            />
          )
        }
      })}
    </React.Fragment>
  )
}

const mapState = state => {
  return {
    products: state.products.allItems
  }
}

const mapDispatch = dispatch => {
  return {
    setCurrentItem: async id => {
      await dispatch(setItem(id))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AllProducts))
