import axios from 'axios'

export const GET_ITEMS = 'GET_ITEMS'
export const SET_ITEM = 'SET_ITEM'

const initialState = {
  currentItem: {},
  allItems: []
}

export const getItems = items => {
  return {
    type: GET_ITEMS,
    items
  }
}

export const setItem = itemId => {
  // console.log("--Set Item--")
  return {
    type: SET_ITEM,
    itemId
  }
}

export const getItemsFromDb = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getItems(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {...state, allItems: action.items}
    case SET_ITEM:
      const [item] = state.allItems.filter(item => item.id == action.itemId)
      return {...state, currentItem: item}
    default:
      return state
  }
}
