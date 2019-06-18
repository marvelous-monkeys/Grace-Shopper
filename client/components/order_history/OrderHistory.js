import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {userOrdersThunk} from '../../store'
import Order from './Order'

class OrderHistory extends Component {
  componentDidMount() {
    this.props.getUserOrders()
  }
  render() {
    return (
      <div>
        {Object.keys(this.props.orders).map((el, i) => (
          <Order key={i} order={this.props.orders[el]} />
        ))}
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {getUserOrders: () => dispatch(userOrdersThunk())}
}

const mapState = state => {
  return {orders: state.orders.userOrders}
}

export default connect(mapState, mapDispatch)(OrderHistory)
