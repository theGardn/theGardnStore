import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SimpleCard from './simple-card'
import {withRouter} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, products, isLoggedIn} = props
  return (
    <div>
      {products.map(item => {
        return (
          <SimpleCard
            key={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            id={item.id}
            price={item.price}
          />
        )
      })}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.user.email,
    isLoggedIn: !!state.user.user.id,
    products: state.products.allItems
  }
}

export default withRouter(connect(mapState)(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
