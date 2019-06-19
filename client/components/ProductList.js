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
      <div className="prods-sect">
        <h2 className="title">Potions</h2>
        <div id="all-products">
          {this.props.products.map(product => {
            return (
              <div key={product.id} className="product-container">
                {/* <Link to={`/products/${product.id}`}> */}
                <h3>{product.name}</h3>
                <img className="p-img" src={product.imageUrl} />
                <p>{product.description}</p>
                <h4>${product.price}</h4>

                {/* </Link> */}
                <button
                  className="bttn"
                  type="button"
                  onClick={() => {
                    this.handleClick(product)
                  }}
                >
                  Add to cart
                </button>
              </div>
            )
          })}
        </div>
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
