import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const CREATE_PRODUCT = 'CREATE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = []
/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_ALL_PRODUCTS, products})
const deleteProduct = id => ({type: DELETE_PRODUCT, id})
const createProduct = product => ({type: CREATE_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const getAllProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteSingleProduct = id => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/products/${id}`, id)
    dispatch(deleteProduct(id))
  } catch (err) {
    console.error(err)
  }
}

export const createNewProduct = product => async dispatch => {
  try {
    const {data} = axios.post('/api/products', product)
    dispatch(createProduct(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return [...action.products]
    case DELETE_PRODUCT:
      return [...state].filter(product => product.id !== action.id)
    case CREATE_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}
