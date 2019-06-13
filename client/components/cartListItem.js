import React from 'react'
import {connect} from 'react-redux'
import {addToCart, removeFromCart} from '../store/cart'

function CartListItem(props) {
  return (
    <tr>
      <th>{props.product.name}</th>
      <th>{props.product.price}</th>
      <th>
        {props.product.quantity}
        <img
          onMouseOver={event =>
            (event.target.src = '../cart/minus_selected.jpg')
          }
          onMouseOut={event => (event.target.src = '../cart/minus.jpg')}
          className="plus-minus-buttons"
          src="../cart/minus.jpg"
          onClick={() => props.removeFromCart(props.product.id)}
        />
        <img
          onMouseOver={event => (event.target.src = '../cart/add_selected.jpg')}
          onMouseOut={event => (event.target.src = '../cart/add.jpg')}
          className="plus-minus-buttons"
          src="../cart/add.jpg"
          onClick={() => props.addToCart(props.product)}
        />
      </th>

      <th>{+props.product.quantity * +props.product.price}</th>
      <th>
        <img
          onMouseOver={event =>
            (event.target.src = '../cart/remove_selected.jpg')
          }
          onMouseOut={event => (event.target.src = '../cart/remove.jpg')}
          className="plus-minus-buttons"
          src="../cart/remove.jpg"
          onClick={() =>
            props.removeFromCart(props.product.id, props.product.quantity)
          }
        />
      </th>
    </tr>
  )
}

const mapDispatch = dispatch => {
  return {
    addToCart: id => dispatch(addToCart(id)),
    removeFromCart: (id, quantity) => dispatch(removeFromCart(id, quantity))
  }
}
export default connect(null, mapDispatch)(CartListItem)
