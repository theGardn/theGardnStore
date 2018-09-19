const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isNumeric: true,
      notEmpty: true,
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'productDefault.png'
  }
})

module.exports = Product

/**
 * instanceMethods
 */
Product.prototype.getProductQuantity = function(getQuantity) {
  if (getQuantity >= 0) {
    this.quantity -= getQuantity
  }
  return this.quantity
}

Product.prototype.addProductQuantity = function(addQuantity) {
  if (addQuantity >= 0) {
    this.quantity += addQuantity
  }
  return this.quantity
}
