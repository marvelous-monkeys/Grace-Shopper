/* eslint-disable no-unused-expressions */
/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProductList from './ProductList'
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store'

let product = [
  {name: 't1', price: 2, description: 'asdfs'},
  {name: 't1', price: 2, description: 'asdfs'}
]

const mockStore = configureMockStore()
const store = mockStore(product)

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Product List', () => {
  // beforeEach(() => {
  //     let prodList = shallow(
  //         <Provider store={store}>
  //             <ProductList />
  //         </Provider>
  //     )
  // });

  describe('ProductList Component', () => {
    it('should render without throwing an error', () => {
      expect(
        shallow(
          <Provider store={store}>
            <ProductList />
          </Provider>
        ).exists(<h2>Product List</h2>)
      ).to.exist
    })
  })

  // it('passes a prop called "products" with the <ProductList /> components', () => {

  //     expect(prodList.props().products).to.have.length(2);

  // });

  // it('renders the product name in an h2', () => {
  //     expect(prodList.find('h2').text()).to.exist()
  // })
})
