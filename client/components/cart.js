import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addToCart, removeFromCart} from '../store/cart'
import {Link} from 'react-router-dom'

import css from './cart.css'
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
            <tr key={el}>
              <th>{this.props.cart.products[el].name}</th>
              <th>{this.props.cart.products[el].price}</th>
              <th>
                {this.props.cart.products[el].quantity}
                {/* <img onMouseOver = {(event)=>event.target.src='../cart/minus_selected.jpg'}
                onMouseOut = {(event)=>event.target.src='../cart/minus.jpg'}
                  className="plus-minus-buttons"
                  src="../cart/minus.jpg"
                />
                <img onMouseOver = {(event)=>event.target.src='../cart/add_selected.jpg'}
                onMouseOut = {(event)=>event.target.src='../cart/add.jpg'}
                  className="plus-minus-buttons"
                  src="../cart/add.jpg" onClick={(ev)=>this.props.addToCart(console.dir(ev.target.parentNode.parentNode.getAttribute('data-key')))}
                /> */}
              </th>
              <th>
                {+this.props.cart.products[el].quantity *
                  +this.props.cart.products[el].price}
              </th>
              <th />
              <th />
            </tr>
          ))}
        </tbody>
        <Link to="/checkout">Checkout Here!</Link>
      </table>
    ) : (
      <h1>The cart is empty</h1>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => {
  return {
    addToCart: id => dispatch(addToCart(id)),
    removeFromCart: id => dispatch(removeFromCart(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
