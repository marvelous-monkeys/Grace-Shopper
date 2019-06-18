import axios from 'axios'
import {getAllProducts} from './products'

const initialState = {}

const GET_PRODUCT = 'GET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

const getSingleProduct = product => ({type: GET_PRODUCT, product})
const updateProduct = product => ({type: UPDATE_PRODUCT, product})

export const fetchProduct = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export const updatingProduct = (id, product) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${id}`, product)
    dispatch(updateProduct(data))
    dispatch(getAllProducts())
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {...action.product}
    case UPDATE_PRODUCT:
      return {...action.product}
    default:
      return state
  }
}
