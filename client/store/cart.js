// import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD = 'ADD'
const REMOVE = 'REMOVE'

/**
 * INITIAL STATE
 */
const initialState = {}
/**
 * ACTION CREATORS
 */
export const addToCart = (product, quantity = 1) => ({
  type: ADD,
  product,
  quantity
})
export const removeFromCart = (productId, quantity = 1) => ({
  type: REMOVE,
  productId,
  quantity
})

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD:
      let newState = {...state, products: {...state.products}}
      if (!newState.products[action.product.id]) {
        newState.products[action.product.id] = action.product
        newState.products[action.product.id].quantity = 0
      }
      newState.products[action.product.id].quantity += action.quantity
      return newState
    case REMOVE:
      let newStateR = {products: {...state.products}}
      if (newStateR.products[action.product.id]) {
        if (newStateR.products[action.product.id].quantity > action.quantity) {
          newStateR.products[action.product.id].quantity =
            newStateR[action.product.id].quantity - action.quantity
        } else {
          delete newStateR.products[action.product.id]
        }
      }
      return newStateR
    default:
      return state
  }
}
