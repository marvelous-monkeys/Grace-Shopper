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
      imageUrl: '',
      didUpdate: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
  }
  componentDidMount() {
    this.props.fetchProduct(+this.props.match.params.id)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      didUpdate: true
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateProduct(+this.props.match.params.id, this.state)

    this.handleRedirect()
  }

  handleRedirect() {
    this.props.history.push('/admin')
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="product-form"
          key={this.props.product.id}
        >
          <label htmlFor="name">
            Name:
            <input
              name="name"
              placeholder={this.props.product.name}
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="price">
            Price:
            <input
              name="price"
              placeholder={this.props.product.price}
              type="text"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="description">
            Description:
            <input
              name="description"
              placeholder={this.props.product.description}
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="imageUrl">
            imageUrl:
            <input
              name="imageUrl"
              placeholder={this.props.product.imageUrl}
              type="text"
              value={this.state.imageUrl}
              onChange={this.handleChange}
            />
          </label>
          {this.state.didUpdate ? <button type="submit">Submit</button> : null}
        </form>
        <button onClick={this.handleRedirect}>Cancel</button>
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
