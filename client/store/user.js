import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const GOT_ITEM_TO_CART = 'GOT_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART'
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

/**
 * INITIAL STATE
 */
const defaultUser = {
  firstName: '',
  lastName: '',
  cart: [],
  orderHistory: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const addItemToCart = item => ({type: ADD_ITEM_TO_CART, item})
const updateItemInCart = (...itemAndQuantity) => ({type: UPDATE_ITEM_IN_CART, itemAndQuantity})
const removeItemFromCart = item => ({type: REMOVE_ITEM_FROM_CART, item})
const getOrderHistory = orderHistory => ({type: GET_ORDER_HISTORY, orderHistory})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const addItemToCartThunk = (item) => async dispatch => {
  try {
    const res = await axios.post('/api/cart', item)
    dispatch(addItemToCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateItemInCartThunk = (itemDetail) => async dispatch => {
  try {
    const res = await axios.put('/api/cart', itemDetail)
    dispatch(updateItemInCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const removeItemFromCartThunk = (item) => async dispatch => {
  try {
    const res = await axios.delete('/api/cart', item)
    dispatch(removeItemFromCart(item))
  } catch (err) {
    console.error(err)
  }
}

export const getOrderHistoryThunk = (orderId) => async dispatch => {
  try {
    if(orderId){
      const res = await axios.get(`/oder/${orderId}`)
    } else {
      const res = await axios.get('/oder')
    }
    dispatch(getOrderHistory(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case ADD_ITEM_TO_CART:
      return {...state, cart: [...cart, action.item]}
    case REMOVE_ITEM_FROM_CART:
      let newCart = cart.filter((item) => {
        return item.id != action.item.id
      })
      return {...state, cart: newCart}
    case UPDATE_ITEM_IN_CART:
      let newCart = cart.map((item) => {
        if(item.id === action.item.id){
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