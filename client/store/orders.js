import axios from 'axios'
import history from '../history'

//Initial State
const initialState = {}

//Action Types
const GET_USER_ORDERS = 'GET_USER_ORDERS'

//Action Creators
const gotUserOrders = userOrders => ({
  type: 'GET_USER_ORDERS',
  userOrders
})

//Thunk Creators
export const userOrdersThunk = () => async dispatch => {
  try {
    const res = await axios.get('api/orders')
    dispatch(gotUserOrders(res.data))
  } catch (error) {
    throw error
  }
}

export const placeOrderThunk = orderInfo => async dispatch => {
  try {
    const res = await axios.post('api/orders', orderInfo)
    history.push('/home')
  } catch (error) {
    throw error
  }
}

//Reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ORDERS:
      return {...action.userOrders}
    default:
      return state
  }
}
