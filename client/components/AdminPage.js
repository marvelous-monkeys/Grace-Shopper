import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProducts} from '../store/products'

class AdminPage extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    const sort = items => {
      return items.sort((a, b) => a.id > b.id)
    }

    return (
      <div id="admin-page">
        <div className="admin-container">
          <h1>Products:</h1>
          <table>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {sort(this.props.products).map(item => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{item.imageUrl}</td>
                    <td>
                      <button type="submit">
                        <Link to={`/admin/products/${item.id}/update`}>
                          Edit
                        </Link>
                      </button>
                    </td>
                    <td>
                      <button type="submit">Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
  users: state.users
})

const mapDispatch = dispatch => ({
  getAllProducts: () => dispatch(getAllProducts())
})

export default connect(mapState, mapDispatch)(AdminPage)
