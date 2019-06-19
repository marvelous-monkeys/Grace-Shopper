import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="welcome">
      <h3 className="welcome-msg">Welcome, {email}</h3>
      {props.orderSuccess.length > 0 && <h4>{props.orderSuccess}</h4>}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    orderSuccess: state.orders.orderSuccess
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
