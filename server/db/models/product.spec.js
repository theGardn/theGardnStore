const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('Validations', () => {
    it('requires name', async () => {
      const product = Product.build({
        price: 5.0
      })
      try {
        await product.validate()
        throw Error('validation should have failed without name')
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })

    it('requires name to not be an empty string', async () => {
      const product = Product.build({
        name: '',
        price: 5.0
      })

      try {
        await product.validate()
        throw Error('validation should have failed with empty string')
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })

    it('requires price', async () => {
      const product = Product.build({
        name: 'randomproduct'
      })
      try {
        await product.validate()
        throw Error('validation should have failed without price')
      } catch (err) {
        expect(err.message).to.contain('price cannot be null')
      }
    })

    it('price must be numeric', async () => {
      const product = Product.build({
        name: 'randomproduct',
        price: 'five'
      })
      try {
        await product.validate()
        throw Error('validation should have failed with string')
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })
  })
})
