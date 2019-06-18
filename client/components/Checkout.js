import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Signup} from './index'
import {auth} from '../store/user'
import {emptyCartDb} from '../store/cart'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      cart: {},
      firstName: '',
      lastName: '',
      streetName: '',
      city: '',
      state: '',
      zipcode: '',
      email: '',
      password: ''
    }
    this.placeOrder = this.placeOrder.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.signUserUp = this.signUserUp.bind(this)
  }

  componentDidMount() {
    this.setState({
      cart: this.props.cart
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async signUserUp(event) {
    this.props.signupUser(event, this.placeOrder)
  }

  async placeOrder() {
    let allProducts = []
    let totalAmount = 0
    for (let singleProduct in this.state.cart.products) {
      let productId = this.state.cart.products[singleProduct].id
      let quantity = this.state.cart.products[singleProduct].quantity
      let price = this.state.cart.products[singleProduct].price
      allProducts.push({
        productId,
        quantity
      })
      totalAmount += quantity * price
    }
    const newOrder = await axios.post('/checkout', {allProducts, totalAmount})
    await this.props.emptyCartDb()
  }

  // eslint-disable-next-line complexity
  render() {
    return !this.props.user.id ? (
      <div>
        <form onSubmit={event => this.signUserUp(event)}>
          {' '}
          <h3>Please Sign Up before checking out</h3>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input
            name="firstName"
            type="text"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input
            name="lastName"
            type="text"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
          <label htmlFor="streetName">
            <small>Street Name</small>
          </label>
          <input
            name="streetName"
            type="text"
            onChange={this.handleChange}
            value={this.state.streetName}
          />
          <label htmlFor="city">
            <small>City</small>
          </label>
          <input
            name="city"
            type="text"
            onChange={this.handleChange}
            value={this.state.city}
          />
          <label htmlFor="state">
            <small>State</small>
          </label>
          <input
            name="state"
            type="text"
            onChange={this.handleChange}
            value={this.state.state}
          />
          <label htmlFor="zipcode">
            <small>Zipcode</small>
          </label>
          <input
            name="zipcode"
            type="text"
            onChange={this.handleChange}
            value={this.state.zipcode}
          />
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input
            name="email"
            type="text"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            name="password"
            type="password"
            onChange={this.handleChange}
            value={this.state.password}
          />{' '}
          <button
            type="submit"
            disabled={
              !this.state.firstName.length ||
              !this.state.lastName.length ||
              !this.state.streetName.length ||
              !this.state.city.length ||
              !this.state.state.length ||
              !this.state.password.length ||
              !this.state.zipcode.length ||
              !this.state.email.length
            }
          >
            Checkout
          </button>
        </form>
      </div>
    ) : (
      <button type="submit" onClick={this.placeOrder}>
        Checkout
      </button>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    async signupUser(evt, placeOrder) {
      evt.preventDefault()
      const formName = 'signup'
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const streetName = evt.target.streetName.value
      const city = evt.target.city.value
      const state = evt.target.state.value
      const zipcode = evt.target.zipcode.value
      await dispatch(
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
      placeOrder()
    },
    emptyCartDb: () => dispatch(emptyCartDb())
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(Checkout)
