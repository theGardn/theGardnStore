import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {withRouter} from 'react-router-dom'
import {Panel, Grid, Row, Col, Button} from 'react-bootstrap';
import "./components-style/auth.css"

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="auth-container">
        <Grid>
          <Row>
            <Col xs={12} sm={8} smOffset={2}>
              <Panel>
              <Panel.Heading><h1 id='login-title'>ENTER LOGIN INFO</h1></Panel.Heading>
              <Panel.Body>
                <form onSubmit={handleSubmit} name={name}>
                  <div className="form-group">
                    <label htmlFor="email">
                      EMAIL
                    </label>
                    <input name="email" type="text" className="form-control"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">
                      PASSWORD
                    </label>
                    <input name="password" type="password" className="form-control"/>
                  </div>
                  <div className="form-group">
                    <Button bsStyle="success" type="submit" id="login-button">{displayName.toUpperCase()}</Button>
                  </div>
                  {error && error.response && <div> {error.response.data} </div>}
                  <h5 id="OR">OR</h5>
                </form>
                <hr/>
                <a href="/auth/google" id="google-o-auth-link">{displayName.toUpperCase()} WITH <span className="blue">G</span><span className="red">O</span><span className="yellow">O</span><span className="blue">G</span><span className="green">L</span><span className="red">E</span></a>
              </Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Grid>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm))
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm))

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
