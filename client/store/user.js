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
const SET_CART = 'SET_CART'

const IS_LOADING = 'IS_LOADING'
const LOADING_FINISH = 'LOADING_FINISH'
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
const updateItemInCart = item => ({
  type: UPDATE_ITEM_IN_CART,
  item
})
const removeItemFromCart = item => ({type: REMOVE_ITEM_FROM_CART, item})
const getOrderHistory = orderHistory => ({
  type: GET_ORDER_HISTORY,
  orderHistory
})
const isLoading = () => ({type: IS_LOADING})
const loadingFinish = () => ({type: LOADING_FINISH})
const clearCart = () => {
  localStorage.clear("garden_store")
  return {type: CLEAR_CART}
}
const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    dispatch(isLoading())
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    console.log('me logged in')
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
    dispatch(clearCart())
    dispatch(getUser(res.data))
    history.push('/home')
    console.log('auth logged in')
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

export const getCart = (user) => {
  return async dispatch => {
    if (Object.keys(user.user).length > 0) {
      const { data } = await axios.get(`/api/cart/${user.id}`);
      console.log(data);
      dispatch(setCart(data));
    }
    else {
      const cart = localStorage.getItem("garden_store");
      console.log(cart);
      dispatch(setCart(cart));
    }
  }
}

export const addItemToCartThunk = (item, quantity, user) => async dispatch => {
  try {
    const newItem = {...item, quantity: quantity}
    dispatch(isLoading())
    if (Object.keys(user.user).length > 0) {
      const res = await axios.post('/api/cart', {
        item: newItem,
        userId: user.id
      })
    }
    dispatch(addItemToCart(newItem))
    let localCart = JSON.parse(localStorage.getItem("garden_store"))
    if (localCart) {
      let itemFound = false;
      console.log(localCart.length);
      if (localCart.id == newItem.id) {
        console.log('item exists in local cart already');
        itemFound = true;
        localCart = [...localCart, {...item, quantity: localCart[i].quantity + newItem.quantity}]
        localStorage.setItem("garden_store", JSON.stringify(localCart));
      }
      if (itemFound === false) {
        console.log('local Cart exists, but item does not');
        localCart = [...localCart, {...newItem}]
      }
    } else {
      console.log('local cart does not exist');
      localCart = [{...newItem}]
    }
    localStorage.setItem("garden_store", JSON.stringify(localCart))
    console.log('current local cart', localCart);
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
    const newItem = {...item, quantity: quantity}
    dispatch(isLoading())
    if (user) {
      const res = await axios.put('/api/cart', {item: newItem, userId: user.id})
    }
    dispatch(updateItemInCart(res.data))
    let localCart = JSON.parse(localStorage.getItem(garden_store))
    if (localCart) {
      localCart[newItem.id] = newItem
    } else {
      localCart = newItem
    }
    localStorage.setItem(garden_store, JSON.stringify(localCart))
    dispatch(loadingFinish())
  } catch (err) {
    console.error(err)
    dispatch(loadingFinish())
  }
}

export const removeItemFromCartThunk = (item, user) => async dispatch => {
  try {
    dispatch(isLoading())
    if (user) {
      const res = await axios.delete('/api/cart', {item: item, userId: user.id})
    }
    dispatch(removeItemFromCart(item))
    let localCart = JSON.parse(localStorage.getItem(garden_store))
    if (localCart) {
      localCart = localCart.filter(innerItem => {
        return innerItem.id !== item.id
      })
    }
    localStorage.setItem(garden_store, JSON.stringify(garden_store, localCart))
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
      res = await axios.put('/api/checkout', {userId: user.id})
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
    console.group("--get order history--")
    console.log("Order ID: ", orderId)
    console.log("User ID: ", userId)
    console.groupEnd()
    let res
    let data
    if (orderId) {
      console.log("Order ID: ", orderId)
      res = await axios.get(`api/orders/${orderId}`)
      data = res.data
      console.log("With the User ID, get order history: ", data)
    } else {
      if (userId) {
        console.log("User ID: ", userId)
        res = await axios.get(`api/users/${userId}/order`)
        data = res.data
        console.log("With the Order ID, get order history: ", data)
      }
    }
    if(data){
      data = [data]
    } else {
      data = []
    }
    // console.log("Thunk get order history: ", data)
    dispatch(getOrderHistory(data))
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
  let newCart
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
      return {...state, cart: [...state.cart, action.item]}
    case REMOVE_ITEM_FROM_CART:
      newCart = cart.filter(item => {
        return item.id != action.item.id
      })
      return {...state, cart: newCart}
    case UPDATE_ITEM_IN_CART:
      newCart = state.cart.map(item => {
        if (item.id === action.item.id) {
          return {...item, quantity: action.item.quantity}
        } else {
          return item
        }
      })
      return {...state, cart: newCart}
    case CLEAR_CART:
      return {...state, cart: []}
    case GET_ORDER_HISTORY:
      return {...state, orderHistory: action.orderHistory}
    default:
      return state
  }
}
