import axios from 'axios'

const initialState = []

const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'

const gotUsers = users => ({type: GET_USERS, users})
const deleteUser = id => ({type: DELETE_USER, id})

export const getUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(gotUsers(data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteSingleUser = id => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/users/${id}`, id)
    dispatch(deleteUser(id))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return [...action.users]
    case DELETE_USER:
      return [...state].filter(user => user.id !== action.id)
    default:
      return state
  }
}
