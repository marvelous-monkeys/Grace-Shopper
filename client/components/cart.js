import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCartDb} from '../store/cart'

import css from './cart.css'
import CartListItem from './cartListItem'
class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    return this.props.cart.products ? (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>
                <h1>Your cart</h1>
              </th>
            </tr>
          </thead>
          <tbody id="cart-table">
            <tr>
              <th id="cart-table-name">Name</th>
              <th id="cart-table-peritem">Price per item</th>
              <th id="cart-table-quant">Quantity</th>
              <th id="cart-table-amount">Amount</th>
              <th id="cart-table-remove">Remove</th>
            </tr>

            {Object.keys(this.props.cart.products).map(el => (
              <CartListItem key={el} product={this.props.cart.products[el]} />
            ))}
          </tbody>
        </table>
        <Link to="/checkout">Checkout Here!</Link>
      </React.Fragment>
    ) : (
      <h1>The cart is empty</h1>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(getCartDb())
})

export default connect(mapState, mapDispatch)(Cart)
