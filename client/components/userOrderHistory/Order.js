import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import OrderProduct from './OrderProduct'
import axios from 'axios'

const Order = ({order}) => {
  return (
    <div>
      <h1> Order #{order.id}</h1>
      <h2>Ordered on: {new Date(order.createdAt).toString().slice(0, 15)}</h2>
      {order.orderProducts.map((el, i) => (
        <OrderProduct key={i} product={el.product} />
      ))}
    </div>
  )
}

const sendRequest = orderId => {
  axios.post('/payment/google', {orderId}).then()
}

export default Order
