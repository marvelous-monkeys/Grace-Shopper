import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Signup} from './index'
import {auth} from '../store/user'
import {emptyCartDb} from '../store/cart'
import {placeOrderThunk} from '../store/orders'


class Checkout extends Component {
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
      password: ''
    }
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

  async signUserUp(evt) {
    evt.preventDefault()
    const userInfo = {
      formName: 'signup',
      email: evt.target.email.value,
      password: evt.target.password.value,
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      streetName: evt.target.streetName.value,
      city: evt.target.city.value,
      state: evt.target.state.value,
      zipcode: evt.target.zipcode.value
    }
    await this.props.createUser(userInfo)
    if (!this.props.user.error) {
      await this.props.placeOrder(this.props.cart)
    }
  }

  // eslint-disable-next-line complexity
  render() {
    return (
      <div>
        <h1>Checkout Here:</h1>
        {this.props.orders.error.length > 0 &&
          (!this.props.cart.products && (
            <h1>Cannot checkout with empty cart!</h1>
          ))}
        {this.props.cart.products ? (
          <h2>
            Order total:{' '}
            {Object.keys(this.props.cart.products).reduce((total, prod) => {
              return (
                total +
                this.props.cart.products[prod].price *
                  this.props.cart.products[prod].quantity
              )
            }, 0)}$
          </h2>
        ) : (
          <h1>CART IS EMPTY!</h1>
        )}
        {!this.props.user.id && (
          <div>
            <form onSubmit={event => this.signUserUp(event)}>
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
            {this.props.user.error && (
              <div>
                <h4>{this.props.user.error.response.data}</h4>
                <h5>All fields required</h5>
                <h5>State must be provided as abbreviation ie NY</h5>
                <h5>Zipcode may only be 5 numbers long</h5>
                <h5>Thank you</h5>
              </div>
            )}
          </div>
        )}
        {this.props.user.id && (
          <div>
            <h2>Shipping Info:</h2>
            <h3>
              Name: {this.props.user.firstName} {this.props.user.lasttName}
            </h3>
            <h3>Street: {this.props.user.streetName}</h3>
            <h3>City: {this.props.user.city}</h3>
            <h3>State: {this.props.user.state}</h3>
            <h3>City: {this.props.user.zipcode}</h3>
            <button
              type="submit"
              onClick={() => this.props.placeOrder(this.props.cart)}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    placeOrder: async cart => {
      let allProducts = []
      let totalAmount = 0
      for (let singleProduct in cart.products) {
        let productId = cart.products[singleProduct].id
        let quantity = cart.products[singleProduct].quantity
        let price = cart.products[singleProduct].price
        allProducts.push({
          productId,
          quantity
        })
        totalAmount += quantity * price
      }
      await dispatch(placeOrderThunk({allProducts, totalAmount}))
      await dispatch(emptyCartDb())
    },
    createUser: async userInfo => {
      await dispatch(
        auth(
          userInfo.email,
          userInfo.password,
          userInfo.firstName,
          userInfo.lastName,
          userInfo.streetName,
          userInfo.city,
          userInfo.state,
          userInfo.zipcode,
          userInfo.formName
        )
      )
    }
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user,
    orders: state.orders
  }
}

export default connect(mapState, mapDispatch)(Checkout)
