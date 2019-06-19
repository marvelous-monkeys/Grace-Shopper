import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createNewProduct, getAllProducts} from '../store/products'

class AddProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: 0,
      description: '',
      imageUrl:
        'https://oldschool.runescape.wiki/images/f/f5/Prayer_potion%281%29_detail.png?74091',
      success: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.createProduct(this.state)
    this.props.getAllProducts()

    this.setState({
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      success: true
    })
  }

  handleRedirect() {
    this.props.history.push('/admin')
  }

  render() {
    return (
      <div>
        <div>
          {this.state.success ? (
            <h1>Successfully Created Item!</h1>
          ) : (
            <h1>Create a New Product:</h1>
          )}
        </div>
        <form onSubmit={this.handleSubmit} className="product-form">
          <label htmlFor="name">
            Name:
            <input
              name="name"
              placeholder="Name..."
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="price">
            Price:
            <input
              name="price"
              placeholder="Price..."
              type="number"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="description">
            Description:
            <input
              name="description"
              placeholder="description..."
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="imageUrl">
            imageUrl:
            <input
              name="imageUrl"
              placeholder="imageUrl..."
              type="text"
              value={this.state.imageUrl}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Create</button>
        </form>
        <button onClick={this.handleRedirect}>Go Back</button>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  createProduct: data => dispatch(createNewProduct(data)),
  getAllProducts: () => dispatch(getAllProducts())
})

export default connect(null, mapDispatch)(AddProductForm)
