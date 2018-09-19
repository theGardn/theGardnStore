const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => db.sync({force: true}))
  let storedProducts

  const productData = [
    {
      name: 'Apples',
      price: 2.0
    },
    {
      name: 'Carrots',
      price: 1.0
    }
  ]

  beforeEach(async () => {
    const createdProducts = await Product.bulkCreate(productData)
    storedProducts = createdProducts.map(product => product.dataValues)
  })

  // Route for fetching all products
  describe('GET `/api/products`', () => {
    it('serves up all Campuses', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200)
      expect(response.body).to.have.length(2)
      expect(response.body[0].name).to.equal(storedProducts[0].name)
    })
  })
})
