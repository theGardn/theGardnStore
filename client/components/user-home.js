import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SimpleCard from './simple-card'
import {withRouter} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  console.log(email);
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <SimpleCard />
      <SimpleCard />
      <SimpleCard />
      <SimpleCard />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.user.email
  }
}

export default withRouter(connect(mapState)(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
