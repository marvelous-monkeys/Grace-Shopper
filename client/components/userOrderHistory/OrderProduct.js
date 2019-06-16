import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const OrderProduct = ({product, quantity}) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <h4>quantity: {quantity}</h4>
    </div>
  )
}

export default OrderProduct
