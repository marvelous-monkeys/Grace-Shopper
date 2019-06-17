import React from 'react'
import {connect} from 'react-redux'
// import {addToCart, removeFromCart} from '../store/cart'
import {addToCartDb, removeFromCartDb} from '../store/cart'

class CartListItem extends React.Component {
  render() {
    const product = this.props.product
    return (
      <tr>
        <th>{product.name}</th>
        <th>{product.price}</th>
        <th>
          {product.quantity}
          <img
            onMouseOver={event =>
              (event.target.src = '../cart/minus_selected.jpg')
            }
            onMouseOut={event => (event.target.src = '../cart/minus.jpg')}
            className="plus-minus-buttons"
            src="../cart/minus.jpg"
            onClick={() => this.props.removeFromCart(product.id)}
          />
          <img
            onMouseOver={event =>
              (event.target.src = '../cart/add_selected.jpg')
            }
            onMouseOut={event => (event.target.src = '../cart/add.jpg')}
            className="plus-minus-buttons"
            src="../cart/add.jpg"
            onClick={() => this.props.addToCart(product)}
          />
        </th>

        <th>{+product.quantity * +product.price}</th>
        <th>
          <img
            onMouseOver={event =>
              (event.target.src = '../cart/remove_selected.jpg')
            }
            onMouseOut={event => (event.target.src = '../cart/remove.jpg')}
            className="plus-minus-buttons"
            src="../cart/remove.jpg"
            onClick={() =>
              this.props.removeFromCart(product.id, product.quantity)
            }
          />
        </th>
      </tr>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addToCart: id => dispatch(addToCartDb(id)),
    removeFromCart: (id, quantity) => dispatch(removeFromCartDb(id, quantity))
  }
}
export default connect(null, mapDispatch)(CartListItem)
