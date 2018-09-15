import React from 'react'
import {connect} from 'react-redux'
import SimpleCard from './simple-card'
import {withRouter} from 'react-router-dom'

export const Categories = props => {
  const {categories} = props
  return (
    <React.Fragment>
      {categories.map(item => {
        return (
          <SimpleCard
            key={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            id={item.id}
          />
        )
      })}
    </React.Fragment>
  )
}

const mapState = state => {
  return {
    categories: state.categories.categories
  }
}

export default withRouter(connect(mapState)(Categories))
