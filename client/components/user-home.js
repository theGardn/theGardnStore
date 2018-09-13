import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SimpleCard from './simple-card'

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

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
