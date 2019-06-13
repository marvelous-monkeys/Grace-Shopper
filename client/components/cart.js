import React, {Component} from 'react'
import {connect} from 'react-redux'

import css from './cart.css'
import CartListItem from './cartListItem'
class Cart extends Component {
  render() {
    return this.props.cart.products ? (
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
    ) : (
      <h1>The cart is empty</h1>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

export default connect(mapState)(Cart)
