import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct, updatingProduct} from '../store/singleProduct'

class EditProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      description: '',
      imageUrl: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.props.fetchProduct(+this.props.match.params.id)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDelete(event) {}

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateProduct(+this.props.match.params.id, this.state)

    this.setState({
      name: '',
      price: '',
      description: '',
      imageUrl: ''
    })

    this.props.history.push('/admin')
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="product-form">
          <label htmlFor="name">
            Name:
            <input
              name="name"
              placeholder="Name..."
              type="text"
              defaultValue={this.props.product.name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="price">
            Price:
            <input
              name="price"
              placeholder="Price..."
              type="text"
              defaultValue={this.props.product.price}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="description">
            Description:
            <input
              name="description"
              placeholder="description..."
              type="text"
              defaultValue={this.props.product.description}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="imageUrl">
            imageUrl:
            <input
              name="imageUrl"
              placeholder="imageUrl..."
              type="text"
              defaultValue={this.props.product.imageUrl}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit" onClick={event => this.handleSubmit(event)}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.singleProduct
})

const mapDispatch = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id)),
  updateProduct: (id, product) => dispatch(updatingProduct(id, product))
})

export default connect(mapState, mapDispatch)(EditProductForm)
