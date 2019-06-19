import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div>
    <h1 className="title">POTION STORE</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="navlink">
            Home
          </Link>
          <Link to="/" className="navlink">
            All Products
          </Link>
          <Link to="/profile" className="navlink">
            My Profile
          </Link>
          <Link to="/cart" className="navlink">
            Cart
          </Link>
          <Link to="/orderHistory" className="navlink">
            Order History
          </Link>
          {user.isAdmin && (
            <Link to="/admin" className="navlink">
              Admin Panel
            </Link>
          )}
          <a href="#" onClick={handleClick} className="navlink">
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <div id="navbar">
            <Link to="/" className="navlink">
              All Products
            </Link>
            <Link to="/login" className="navlink">
              Login
            </Link>
            <Link to="/signup" className="navlink">
              Sign Up
            </Link>
            <Link to="/cart" className="navlink">
              Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
