import React from 'react'
import {userOrdersThunk} from '../store'
import {connect} from 'react-redux'

class PaymentSuccess extends React.Component {
  constructor(props) {
    super(props)
    this.props.getUserOrders()
    setTimeout(this.closeWindow, 3000)
  }

  closeWindow() {
    window.close()
  }

  render() {
    return (
      <div>
        <h1> The order has been approved!</h1>
        <h1> Window will be closed in 3 seconds.</h1>
        <button onClick={() => this.closeWindow()}>Close immediately</button>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  getUserOrders: () => dispatch(userOrdersThunk())
})

export default connect(null, mapDispatch)(PaymentSuccess)
