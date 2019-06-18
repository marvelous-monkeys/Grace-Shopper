import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import OrderProduct from './OrderProduct'

const Order = ({order}) => {
  return (
    <div>
      <h1> Order #{order.id}</h1>
      <h2>Ordered on: {new Date(order.createdAt).toString().slice(0, 15)}</h2>
      {order.orderProducts.map((el, i) => (
        <OrderProduct key={i} product={el.product} quantity={el.quantity} />
      ))}
    </div>
  )
}

export default Order
