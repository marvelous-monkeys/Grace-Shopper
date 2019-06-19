import React, {Component} from 'react'
import OrderProduct from './OrderProduct'
import axios from 'axios'

export default class Order extends Component {
  handlePayment(orderId) {
    axios.post('payments/paypal/pay', {orderId}).then(({data}) => {
      let child = window.open(
        data,
        'sharer',
        'toolbar=0,status=0,width=548,height=750'
      )
      setInterval(() => {
        if (child.closed) window.location.reload()
      }, 500)
    })
  }

  render() {
    const order = this.props.order
    return (
      <div>
        <h1> Order #{order.id}</h1>
        <h2>Ordered on: {new Date(order.createdAt).toString().slice(0, 15)}</h2>
        {order.orderProducts.map((el, i) => (
          <OrderProduct key={i} product={el.product} quantity={el.quantity} />
        ))}
        <h2>Total amount: ${order.totalAmount}</h2>
        {order.payment ? (
          <h2>Status: Payment done</h2>
        ) : (
          <div>
            <h2>Status: payment required</h2>
            <button onClick={() => this.handlePayment(order.id)}>
              <img
                src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_150x38.png"
                alt="PayPal"
              />
            </button>
          </div>
        )}
      </div>
    )
  }
}
