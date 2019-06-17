import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Signup} from './index'
import {auth} from '../store/user'
import {emptyCart} from '../store/cart'
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
    // this.props.signupUser(event, this.props.cart)
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
    await this.props.placeOrder(this.props.cart)
  }

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
      <button
        type="submit"
        onClick={() => this.props.placeOrder(this.props.cart)}
      >
        Checkout
      </button>
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
      await dispatch(emptyCart())
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
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(Checkout)
