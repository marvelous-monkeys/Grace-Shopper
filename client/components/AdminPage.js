import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProducts, deleteSingleProduct} from '../store/products'
import {getUsers} from '../store/users'
import {deleteSingleUser} from '../store/users'

class AdminPage extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
    this.props.getUsers()
  }

  render() {
    const sort = arr => {
      return arr.sort((a, b) => a.id > b.id)
    }

    const filterAdmin = (arr, id) => {
      return arr.filter(user => user.id !== id)
    }
    return (
      <div id="admin-page">
        <div className="admin-container">
          <h1>Products:</h1>
          <button type="submit">
            <Link to="/admin/products/create">Add New Item</Link>
          </button>
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
                      <button
                        type="submit"
                        onClick={() => this.props.deleteProduct(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <h1>Users:</h1>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Email</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.map(user => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        type="submit"
                        onClick={() => this.props.removeUser(user.id)}
                      >
                        Delete
                      </button>
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
  getAllProducts: () => dispatch(getAllProducts()),
  deleteProduct: id => dispatch(deleteSingleProduct(id)),
  getUsers: () => dispatch(getUsers()),
  removeUser: id => dispatch(deleteSingleUser(id))
})

export default connect(mapState, mapDispatch)(AdminPage)
