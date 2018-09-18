// Components
import React from 'react'
import {shallow, configure} from 'enzyme'
import {AllProducts} from './all-products'
import Adapter from 'enzyme-adapter-react-16'
import {expect} from 'chai'

configure({adapter: new Adapter()})
// create any initial state needed
const products = [
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

describe('AllProducts', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <AllProducts
        products={products}
        match={{
          params: {
            id: 1
          }
        }}
        setCurrentItem={() => null}
      />
    )
    expect(wrapper.find('.simple_product_card').length).to.be.equal(2)
  })
})
