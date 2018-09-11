const Sequelize = require('sequelize')
const db = require('../db')

const Order_Detail = db.define('order_details', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
})

module.exports = Order_Detail
