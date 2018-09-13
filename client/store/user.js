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
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const addItemToCart = item => ({type: ADD_ITEM_TO_CART, item})
const updateItemInCart = (...itemAndQuantity) => ({
  type: UPDATE_ITEM_IN_CART,
  itemAndQuantity
})
const removeItemFromCart = item => ({type: REMOVE_ITEM_FROM_CART, item})
const getOrderHistory = orderHistory => ({
  type: GET_ORDER_HISTORY,
  orderHistory
})
const isLoading = () => ({type: IS_LOADING})
const loadingFinish = () => ({type: LOADING_FINISH})

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
    res = await axios.post(`/auth/${method}`, {email, password})
    dispatch(loadingFinish())
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
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
    dispatch(loadingFinish())
  } catch (err) {
    console.error(err)
    dispatch(loadingFinish())
  }
}

export const addItemToCartThunk = (item, quantity) => async dispatch => {
  try {
    const newItem = {...item, quantity: quantity}
    dispatch(isLoading())
    const res = await axios.post('/api/cart', newItem)
    dispatch(addItemToCart(newItem))
    let localCart = JSON.parse(localStorage.getItem(garden_store))
    if (localCart) {
      localCart = {...localCart, [newItem.id]: newItem}
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

export const updateItemInCartThunk = (item, quantity) => async dispatch => {
  try {
    const newItem = {...item, quantity: quantity}
    dispatch(isLoading())
    const res = await axios.put('/api/cart', newItem)
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

export const removeItemFromCartThunk = item => async dispatch => {
  try {
    dispatch(isLoading())
    const res = await axios.delete('/api/cart', item)
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

export const getOrderHistoryThunk = orderId => async dispatch => {
  try {
    dispatch(isLoading())
    if (orderId) {
      const res = await axios.get(`/oder/${orderId}`)
    } else {
      const res = await axios.get('/oder')
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
export default function(state = defaultUser, action) {
  switch (action.type) {
    case IS_LOADING:
      return {...state, isLoading: true}
    case LOADING_FINISH:
      return {...state, isLoading: false}
    case GET_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return defaultUser
    case ADD_ITEM_TO_CART:
      return {...state, cart: [...cart, action.item]}
    case REMOVE_ITEM_FROM_CART:
      let newCart = cart.filter(item => {
        return item.id != action.item.id
      })
      return {...state, cart: newCart}
    case UPDATE_ITEM_IN_CART:
      let newCart = cart.map(item => {
        if (item.id === action.item.id) {
          return {...item, quantity: action.item.quantity}
        } else {
          return item
        }
      })
      return {...state, cart: newCart}
    case GET_ORDER_HISTORY:
      return {...state, orderHistory: action.orderHistory}
    default:
      return state
  }
}
