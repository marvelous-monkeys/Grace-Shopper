import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import OrderProduct from './OrderProduct'
import axios from 'axios'

const Order = props => {
  const createPayment = orderId => {
    axios.post('payments/paypal/pay', {orderId}).then(({data}) => {
      window.open(data, 'sharer', 'toolbar=0,status=0,width=548,height=750')
    })
  }
  const order = props.order
  return (
    <div>
      <h1> Order #{order.id}</h1>
      <h2>Ordered on: {new Date(order.createdAt).toString().slice(0, 15)}</h2>
      {order.orderProducts.map((el, i) => (
        <OrderProduct key={i} product={el.product} />
      ))}
      <button onClick={() => createPayment(order.id)}>Pay This One!</button>
    </div>
  )
}

// class Order extends React.Component{
//   constructor(props) {
//     super(props)
//     this.state = {showPopup: false}
//   }

//   handlePayment(orderId) {
//     axios.post('payments/paypal/pay',{orderId}).then(({data})=>history.push(data))
//   }

//   render() {
//     const order = this.props.order
//     return (
//       <div>
//         <h1> Order #{order.id}</h1>
//         <h2>Ordered on: {new Date(order.createdAt).toString().slice(0, 15)}</h2>
//         {order.orderProducts.map((el, i) => (
//           <OrderProduct key={i} product={el.product} />
//         ))}
//         <button onClick={()=>createPayment(order.id)}>Pay This One!</button>
//       </div>
//     )
//   }

// }

const sendRequest = orderId => {
  axios.post('/payment/google', {orderId}).then()
}

export default Order
