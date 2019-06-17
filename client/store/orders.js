import axios from 'axios'

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
    console.log('orderHistory error')
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
