import axios from 'axios'

export const GOT_CATEGORIES = 'GOT_CATEGORIES'

export const gotCategories = categories => {
  return {
    type: GOT_CATEGORIES,
    categories
  }
}

export const getCategories = () => {
  return async dispatch => {
    const res = await axios.get('/api/categories')
    const categories = res.data
    dispatch(gotCategories(categories))
  }
}

const initialState = {
  categories: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_CATEGORIES:
      return {...state, categories: action.categories}
    default:
      return state
  }
}
