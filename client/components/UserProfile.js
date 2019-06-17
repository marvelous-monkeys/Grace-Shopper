import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateMe} from '../store/user'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import UserHome from './user-home'

class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      streetName: '',
      city: '',
      state: '',
      zipcode: '',
      email: '',
      button: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.updatingTheUser = this.updatingTheUser.bind(this)
    // this.redirect = this.redirect.bind(this)
  }

  handleChange(event) {
    this.setState({button: true})
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  updatingTheUser(event) {
    const userID = this.props.user.id
    this.props.updateUser(event, userID)
  }

  // redirect(){
  //   console.log(this.props)
  // }

  // eslint-disable-next-line complexity
  render() {
    return (
      <div>
        <form onSubmit={event => this.updatingTheUser(event)}>
          {' '}
          <h3>Update Info</h3>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input
            name="firstName"
            type="text"
            onChange={this.handleChange}
            value={this.state.firstName || this.props.user.firstName}
          />
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input
            name="lastName"
            type="text"
            onChange={this.handleChange}
            value={this.state.lastName || this.props.user.lastName}
          />
          <label htmlFor="streetName">
            <small>Street Name</small>
          </label>
          <input
            name="streetName"
            type="text"
            onChange={this.handleChange}
            value={this.state.streetName || this.props.user.streetName}
          />
          <label htmlFor="city">
            <small>City</small>
          </label>
          <input
            name="city"
            type="text"
            onChange={this.handleChange}
            value={this.state.city || this.props.user.city}
          />
          <label htmlFor="state">
            <small>State</small>
          </label>
          <input
            name="state"
            type="text"
            onChange={this.handleChange}
            value={this.state.state || this.props.user.state}
          />
          <label htmlFor="zipcode">
            <small>Zipcode</small>
          </label>
          <input
            name="zipcode"
            type="text"
            onChange={this.handleChange}
            value={this.state.zipcode || this.props.user.zipcode}
          />
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input
            name="email"
            type="text"
            onChange={this.handleChange}
            value={this.state.email || this.props.user.email}
          />
          <button type="submit" disabled={!this.state.button}>
            UPDATE
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    async updateUser(evt, id) {
      evt.preventDefault()
      const email = evt.target.email.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const streetName = evt.target.streetName.value
      const city = evt.target.city.value
      const state = evt.target.state.value
      const zipcode = evt.target.zipcode.value
      const userId = id

      const updateInfo = {
        email,
        firstName,
        lastName,
        streetName,
        city,
        state,
        zipcode
      }

      await dispatch(updateMe(userId, updateInfo))
    }
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
