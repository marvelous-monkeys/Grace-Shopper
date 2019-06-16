import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import OrderProduct from './OrderProduct'

const Order = ({order}) => {
  return (
    <div>
      <h1> Order #{order.id}</h1>
      <h2>Created on: {order.createdAt}</h2>
      {order.orderProducts.map(el => <OrderProduct product={el.product} />)}
    </div>
  )
}

export default Order
