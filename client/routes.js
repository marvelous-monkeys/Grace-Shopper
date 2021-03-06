import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Cart,
  Checkout,
  AdminPage,
  EditProductForm,
  AddProductForm,
  OrderHistory,
  PaymentSuccess,
  PaymentFail
} from './components'
import {me} from './store'
import ProductList from './components/ProductList'
import UserProfile from './components/UserProfile'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const {isAdmin} = this.props

    return (
      <Switch>
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/cart" component={Checkout} />
            <Route path="/orderHistory" component={OrderHistory} />
            <Route path="/PaymentSuccess" component={PaymentSuccess} />
            <Route path="/PaymentFail" component={PaymentFail} />
            <Route exact path="/" component={ProductList} />
            {isAdmin && (
              <Switch>
                <Route exact path="/admin" component={AdminPage} />
                <Route
                  exact
                  path="/admin/products/create"
                  component={AddProductForm}
                />
                <Route
                  path="/admin/products/:id/update"
                  component={EditProductForm}
                />
              </Switch>
            )}
          </Switch>
        )}
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/cart" component={Checkout} />
        <Route path="/" component={ProductList} />
        <Route path="/orderHistory" component={OrderHistory} />
        <Route path="/PaymentSuccess" component={PaymentSuccess} />
        <Route path="/PaymentFail" component={PaymentFail} />
        <Route exact path="/" component={ProductList} />
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
