const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

let orderNum = 0;

const generateOrderId = () => {
  return 'order#' + orderNum++
}

const Order = db.define('order', {
  purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  orderId: {
    type: Sequelize.STRING,
    defaultValue: generateOrderId()
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

Order.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

Order.encryptOrderId = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

const setSaltAndOrderId = order => {
  order.salt = Order.generateSalt()
  order.orderId = Order.encryptOrderId(order.orderId, order.salt())
}

Order.beforeCreate(setSaltAndOrderId)


module.exports = Order
