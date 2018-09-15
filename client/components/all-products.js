import React from 'react'
import {connect} from 'react-redux'
import SimpleCard from './simple-card'
import {withRouter} from 'react-router-dom'

export const AllProducts = props => {
  const {products} = props
  return (
    <React.Fragment>
      {products.map(item => {
        return (
          <SimpleCard
            key={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.price}
            id={item.id}
          />
        )
      })}
    </React.Fragment>
  )
}

const mapState = state => {
  return {
    products: state.products.allItems
  }
}

export default withRouter(connect(mapState)(AllProducts))
