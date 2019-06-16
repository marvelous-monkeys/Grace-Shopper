import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const OrderProduct = ({product}) => {
  return (
    <div>
      <h3>{product.name}</h3>
    </div>
  )
}

export default OrderProduct
