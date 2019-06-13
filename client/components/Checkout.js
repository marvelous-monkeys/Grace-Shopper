import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      cart: {}
    }
    this.placeOrder = this.placeOrder.bind(this)
  }

  componentDidMount() {
    this.setState({
      cart: this.props.cart
    })
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
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            this.placeOrder()
          }}
        >
          Checkout
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapState, null)(Checkout)
