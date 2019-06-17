import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD = 'ADD'
const REMOVE = 'REMOVE'
const EMPTY = 'EMPTY'
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const initialState = {}
/**
 * ACTION CREATORS
 */
const getCart = products => ({type: GET_CART, products})

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

export const emptyCart = () => ({
  type: EMPTY
})

/**
 * THUNKS
 */
export const getCartDb = () => dispatch => {
  axios
    .get('/api/cart')
    .then(({data}) => dispatch(getCart(data)))
    .catch(e => console.error(e))
}

export const addToCartDb = (product, quantity = 1) => dispatch => {
  axios
    .put('/api/cart', {params: {id: product.id, quantity}})
    .then(() => dispatch(addToCart(product, quantity)))
    .catch(e => console.error(e))
}

export const removeFromCartDb = (id, quantity = 1) => dispatch => {
  axios
    .delete('/api/cart', {params: {id, quantity}})
    .then(() => dispatch(removeFromCart(id, quantity)))
    .catch(e => console.error(e))
}

export const emptyCartDb = () => dispatch => {
  axios
    .delete('/api/cart')
    .then(() => dispatch(emptyCart()))
    .catch(e => console.error(e))
}

/**
 * REDUCER
 */
// eslint-disable-next-line complexity
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD:
      let newState = {...state, products: {...state.products}}
      if (!newState.products[action.product.id]) {
        newState.products[action.product.id] = {...action.product}
        newState.products[action.product.id].quantity = 0
      }
      newState.products[action.product.id] = {
        ...newState.products[action.product.id]
      }
      newState.products[action.product.id].quantity += action.quantity
      return newState
    case REMOVE:
      let newStateR = {...state, products: {...state.products}}
      if (newStateR.products[action.productId]) {
        if (newStateR.products[action.productId].quantity > action.quantity) {
          newStateR.products[action.productId] = {
            ...newStateR.products[action.productId]
          }
          newStateR.products[action.productId].quantity =
            newStateR.products[action.productId].quantity - action.quantity
        } else {
          delete newStateR.products[action.productId]
          if (Object.keys(newStateR.products).length < 1) {
            delete newStateR.products
          }
        }
      }
      return newStateR
    case EMPTY:
      return {}
    case GET_CART:
      let initialCart = {}
      if (action.products.length) {
        initialCart.products = {}
        action.products.forEach(el => {
          initialCart.products[el.product.id] = el.product
          initialCart.products[el.product.id].quantity = el.quantity
        })
      }
      return initialCart
    default:
      return state
  }
}
