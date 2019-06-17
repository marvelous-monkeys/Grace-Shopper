import axios from 'axios'
import history from '../history'

//Initial State
const initialState = {userOrders: {}, error: '', orderSuccess: ''}

//Action Types
const GET_USER_ORDERS = 'GET_USER_ORDERS'
const SET_ERROR = 'SET_ERROR'
const PLACE_ORDER = 'PLACE_ORDER'

//Action Creators
const getUserOrders = userOrders => ({
  type: 'GET_USER_ORDERS',
  userOrders
})

const setError = error => ({
  type: 'SET_ERROR',
  error
})

const placeOrder = () => ({
  type: 'PLACE_ORDER'
})

//Thunk Creators
export const userOrdersThunk = () => async dispatch => {
  try {
    const res = await axios.get('api/orders')
    dispatch(getUserOrders(res.data))
  } catch (error) {
    throw error
  }
}

export const placeOrderThunk = orderInfo => async dispatch => {
  try {
    if (orderInfo.totalAmount > 0) {
      const res = await axios.post('api/orders', orderInfo)
      dispatch(placeOrder())
      history.push('/home')
    } else {
      throw 'Cart cannot be empty!'
    }
  } catch (error) {
    dispatch(setError(error))
  }
}

//Reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ORDERS:
      return {...state, userOrders: {...action.userOrders}}
    case PLACE_ORDER:
      return {
        ...state,
        orderSuccess: 'Order Successfully placed! Thank you!',
        error: ''
      }
    case SET_ERROR:
      return {...state, error: action.error}
    default:
      return state
  }
}
