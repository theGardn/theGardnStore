import {expect} from 'chai'
import reducer, {
  GET_ITEMS,
  SET_ITEM,
  setItem,
  getItems,
  getItemsFromDb
} from './products'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const items = [
  {
    id: 1,
    name: 'carrot',
    imageUrl: 'https://picsum.photos/200/300',
    price: 3.0,
    categoryId: 1
  },
  {
    id: 2,
    name: 'broccoli',
    imageUrl: 'https://picsum.photos/200/300',
    price: 3.0,
    categoryId: 1
  },
  {
    id: 3,
    name: 'apple',
    imageUrl: 'https://picsum.photos/200/300',
    price: 3.0,
    categoryId: 2
  }
]

describe('redux', () => {
  let store
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  describe('actions', () => {
    it('should create an action to add items', () => {
      const expectedAction = {
        type: GET_ITEMS,
        items
      }
      expect(getItems(items)).to.deep.equal(expectedAction)
    })
    it('should create an action to set current item', () => {
      const expectedAction = {
        type: SET_ITEM,
        itemId: 1
      }
      expect(setItem(1)).to.deep.equal(expectedAction)
    })
  })

  describe('async actions', () => {
    it('creates GET_ITEMS_REQUEST when fetching todos', () => {
      const expectedActions = [
        {
          type: GET_ITEMS,
          items
        }
      ]
      store = mockStore({allItems: []})
      mockAxios.onGet('/api/products').replyOnce(200, items)
      store
        .dispatch(getItemsFromDb())
        .then(() => expect(store.getActions()).to.deep.equal(expectedActions))
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('store', () => {
    it('handles GET_ITEMS', () => {
      expect(
        reducer(
          {},
          {
            type: GET_ITEMS,
            items
          }
        )
      ).to.deep.equal({
        allItems: items
      })
    })

    it('handles SET_ITEM', () => {
      expect(
        reducer(
          {allItems: items},
          {
            type: SET_ITEM,
            itemId: 1
          }
        )
      ).to.deep.equal({allItems: items, currentItem: items[0]})
    })
  })
})
