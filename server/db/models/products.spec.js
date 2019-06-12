/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  before(() => {
    return db.sync({force: true})
  })

  afterEach(() => {
    return db.sync({force: true})
  })

  describe('Correctly Seeds', () => {
    beforeEach(async () => {
      await Promise.all([
        Product.create({name: 't1', price: 2, description: 'asdfs'}),
        Product.create({name: 't2', price: 2, description: 'asdfs'}),
        Product.create({name: 't3', price: 3, description: 'asdfs'}),
        Product.create({name: 't4', price: 3, description: 'asdfs'})
      ])
    })

    it('finds certain products of a given price value', async function() {
      const cost2 = await Product.findAll({where: {price: 2}})
      const cost3 = await Product.findAll({where: {price: 3}})

      expect(cost2).to.have.length(2)
      expect(cost3).to.have.length(2)
    })
  }) // end describe('instanceMethods')
}) // end describe('User model')
