/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products', () => {
    beforeEach(async () => {
      const prod = await Product.create({
        name: 'ABC',
        price: 10,
        description: 'alksdflkslfk sdlksdf'
      })
      return prod
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('ABC')
    })

    it('GET /api/products/:id', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      if (typeof res.body === 'string') {
        res.body = JSON.parse(res.body)
      }
      expect(res.body.name).to.equal('ABC')
    })
  })

  describe(' POST /api/products/', () => {
    it('GET /api/products:id', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({
          name: 'ABC',
          price: 1,
          description: 'alksdflkslfk sdlksdf'
        })
        .expect(200)

      expect(res.body.name).to.equal('ABC')
    })
  })
})
