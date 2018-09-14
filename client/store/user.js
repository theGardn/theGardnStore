import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART'
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'
const CLEAR_CART = 'CLEAR_CART'

const IS_LOADING = 'IS_LOADING'
const LOADING_FINISH = 'LOADING_FINISH'

const garden_store = 'garden_store'
/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {},
  cart: [],
  orderHistory: [],
  isLoading: false
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const addItemToCart = item => ({ type: ADD_ITEM_TO_CART, item })
const updateItemInCart = (...itemAndQuantity) => ({
  type: UPDATE_ITEM_IN_CART,
  itemAndQuantity
})
const removeItemFromCart = item => ({ type: REMOVE_ITEM_FROM_CART, item })
const getOrderHistory = orderHistory => ({
  type: GET_ORDER_HISTORY,
  orderHistory
})
const isLoading = () => ({ type: IS_LOADING })
const loadingFinish = () => ({ type: LOADING_FINISH })
const clearCart = () => ({ type: CLEAR_CART })

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    dispatch(isLoading())
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    dispatch(loadingFinish())
  } catch (err) {
    console.error(err)
    dispatch(loadingFinish())
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    dispatch(isLoading())
    res = await axios.post(`/auth/${method}`, { email, password })
    dispatch(loadingFinish())
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(clearCart())
    dispatch(getUser(res.data))
    history.push('/home')
    dispatch(loadingFinish())
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
    dispatch(loadingFinish())
  }
}

export const logout = () => async dispatch => {
  try {
    dispatch(isLoading())
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
    dispatch(clearCart())
    dispatch(loadingFinish())
  } catch (err) {
    console.error(err)
    dispatch(loadingFinish())
  }
}

export const addItemToCartThunk = (item, quantity, user) => async dispatch => {
  try {
    const newItem = { ...item, quantity: quantity }
    dispatch(isLoading())
    const res = await axios.post('/api/cart', { item: newItem, userId: user.id })
    dispatch(addItemToCart(newItem))
    let localCart = JSON.parse(localStorage.getItem(garden_store))
    if (localCart) {
      localCart = { ...localCart, [newItem.id]: newItem }
    } else {
      localCart = newItem
    }
    localStorage.setItem(JSON.stringify(garden_store, localCart))
    dispatch(loadingFinish())
  } catch (err) {
    console.error(err)
    dispatch(loadingFinish())
  }
}

export const updateItemInCartThunk = (
  item,
  quantity,
  user
) => async dispatch => {
  try {
    const newItem = { ...item, quantity: quantity }
    dispatch(isLoading())
    const res = await axios.put('/api/cart', { item: newItem, userId: user.id })
    dispatch(updateItemInCart(res.data))
    let localCart = JSON.parse(localStorage.getItem(garden_store))
    if (localCart) {
      localCart[newItem.id] = newItem
    } else {
      localCart = newItem
    }
    localStorage.setItem(JSON.stringify(garden_store, localCart))
    dispatch(loadingFinish())
  } catch (err) {
    console.error(err)
    dispatch(loadingFinish())
  }
}

export const removeItemFromCartThunk = (item, user) => async dispatch => {
  try {
    dispatch(isLoading())
    const res = await axios.delete('/api/cart', { item: item, userId: user.id })
    dispatch(removeItemFromCart(item))
    let localCart = JSON.parse(localStorage.getItem(garden_store))
    if (localCart) {
      localCart = localCart.filter(innerItem => {
        return innerItem.id !== item.id
      })
    }
    localStorage.setItem(JSON.stringify(garden_store, localCart))
    dispatch(loadingFinish())
  } catch (err) {
    console.error(err)
    dispatch(loadingFinish())
  }
}

// post '/api/checkout'  for guest
// put '/api/checkout'
export const submitCheckoutThunk = user => async dispatch => {
  try {
    dispatch(isLoading())
    let res
    if (user) {
      res = await axios.put('/api/checkout', { userId: user.id })
    } else {
      let localCart = JSON.parse(localStorage.getItem(garden_store))
      if (localCart) {
        res = await axios.post('/api/checkout', {
          item: localCart,
          userId: null
        })
      }
    }
    dispatch(clearCart())
    localStorage.clear(garden_store)
    dispatch(loadingFinish())
  } catch (err) {
    console.error(err)
    dispatch(loadingFinish())
  }
}

export const getOrderHistoryThunk = (userId, orderId) => async dispatch => {
  try {
    dispatch(isLoading())
    let res
    if (orderId) {
      res = await axios.get(`/orders/${orderId}`)
    } else {
      res = await axios.get(`/users/${userId}`)
    }
    dispatch(getOrderHistory(res.data))
    dispatch(loadingFinish())
  } catch (err) {
    console.error(err)
    dispatch(loadingFinish())
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  let newCart
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: true }
    case LOADING_FINISH:
      return { ...state, isLoading: false }
    case GET_USER:
      return { ...state, user: action.user }
    case REMOVE_USER:
      return defaultUser
    case ADD_ITEM_TO_CART:
      return { ...state, cart: [...cart, action.item] }
    case REMOVE_ITEM_FROM_CART:
      newCart = cart.filter(item => {
        return item.id != action.item.id
      })
      return { ...state, cart: newCart }
    case UPDATE_ITEM_IN_CART:
      newCart = cart.map(item => {
        if (item.id === action.item.id) {
          return { ...item, quantity: action.item.quantity }
        } else {
          return item
        }
      })
      return { ...state, cart: newCart }
    case CLEAR_CART:
      return { ...state, cart: [] }
    case GET_ORDER_HISTORY:
      return { ...state, orderHistory: action.orderHistory }
    default:
      return state
  }
}
