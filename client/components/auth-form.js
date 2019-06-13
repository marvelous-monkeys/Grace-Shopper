import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          {name === 'signup' && (
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
          )}
          {name === 'signup' && <input name="firstName" type="text" />}

          {name === 'signup' && (
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
          )}
          {name === 'signup' && <input name="lastName" type="text" />}

          {name === 'signup' && (
            <label htmlFor="streetName">
              <small>Street Name</small>
            </label>
          )}
          {name === 'signup' && <input name="streetName" type="text" />}

          {name === 'signup' && (
            <label htmlFor="city">
              <small>City</small>
            </label>
          )}
          {name === 'signup' && <input name="city" type="text" />}

          {name === 'signup' && (
            <label htmlFor="state">
              <small>State</small>
            </label>
          )}
          {name === 'signup' && <input name="state" type="text" />}

          {name === 'signup' && (
            <label htmlFor="zipcode">
              <small>Zipcode</small>
            </label>
          )}
          {name === 'signup' && <input name="zipcode" type="text" />}

          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
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
      const firstName = evt.target.firstName ? evt.target.firstName.value : null
      const lastName = evt.target.lastName ? evt.target.lastName.value : null
      const streetName = evt.target.streetName
        ? evt.target.streetName.value
        : null
      const city = evt.target.city ? evt.target.city.value : null
      const state = evt.target.state ? evt.target.state.value : null
      const zipcode = evt.target.zipcode ? evt.target.zipcode.value : null
      dispatch(
        auth(
          email,
          password,
          firstName,
          lastName,
          streetName,
          city,
          state,
          zipcode,
          formName
        )
      )
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
