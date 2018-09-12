import axios from 'axios'

const GET_ITEMS = 'GET_ITEMS'
const SET_ITEM = 'SET_ITEM'
const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST'

const initialState = {
  currentItem: {},
  allItems: [],
  isLoading: true
}

const loading = () => {
  return {
    type: GET_ITEMS_REQUEST
  }
}

const getItems = items => {
  return {
    type: GET_ITEMS,
    items
  }
}

export const setItem = itemId => {
  return {
    type: SET_ITEM,
    itemId
  }
}

export const getItemsFromDb = () => {
  return async dispatch => {
    dispatch(loading())
    try {
      const items = await axios.get('/api/products')
      dispatch(getItems(items))
    } catch (err) {
      console.error(err)
    }
  }
}

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return {...state, isLoading: true}
    case GET_ITEMS:
      return {...state, allItems: action.items, isLoading: false}
    case SET_ITEM:
      const item = state.allItems.filter(item => item.id == action.itemId)
      return {...state, currentItem: item}
    default:
      return state
  }
}
