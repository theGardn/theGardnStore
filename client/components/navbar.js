import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout, me} from '../store'
import './components-style/navbar.css';
import {Navbar as BootstrapNavbar} from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom';

const Navbar = props => {
  const {handleClick, isLoggedIn, user} = props;
  return (
    <BootstrapNavbar inverse>
      <BootstrapNavbar.Header>
        <BootstrapNavbar.Brand>
          <h1>The Gardn</h1>
        </BootstrapNavbar.Brand>
      </BootstrapNavbar.Header>
      <BootstrapNavbar.Text>
        {
          isLoggedIn ? (
            <span>Hello, {user.firstName}</span>
          ) : null
        }
      </BootstrapNavbar.Text>
      {
        isLoggedIn ? (
          <ul className="nav navbar-nav navbar-right">
            <li>
              <NavLink to='/home' className='nav-link'>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to='#' className='nav-link' onClick={handleClick}>
                LOG OUT
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to='/home' className='nav-link'>
              HOME
            </Link>
          </li>
          <li>
            <Link to='/login' className='nav-link'>
              LOG IN
            </Link>
          </li>
          <li>
            <Link to='/signup' className='nav-link'>
              SIGN UP
            </Link>
          </li>
        </ul>
        )
      }
    </BootstrapNavbar>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.user.id,
    user: state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(
  mapState,
  mapDispatch
)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
