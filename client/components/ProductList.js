import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/products'
import {Link} from 'react-router-dom'
import {addToCartDb} from '../store/cart' //TODO:
// import Axios from 'axios'

class ProductList extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  // async handleClick(id) {
  //   await Axios.delete(`/api/products/${id}`)
  //   this.props.getAllProducts();
  // }

  handleClick(product) {
    this.props.addToCart(product)
  }

  render() {
    return (
      <div>
        <h2>Product List</h2>
        {this.props.products.map(product => {
          return (
            <div key={product.id}>
              {/* <Link to={`/products/${product.id}`}> */}
              <h3>{product.name}</h3>
              <img src={product.imageUrl} />
              <p>{product.description}</p>
              <h4>{product.price}</h4>

              {/* </Link> */}
              <button
                type="button"
                onClick={() => {
                  this.handleClick(product)
                }}
              >
                ADD to cart
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

function mapState(state) {
  return {
    products: state.products
  }
}

function mapDispatch(dispatch) {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
    addToCart: product => dispatch(addToCartDb(product))
  }
}

export default connect(mapState, mapDispatch)(ProductList)

// export default ProductList
