const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Order_Detail = require('./order_detail')
const Order = require('./order')

Product.belongsTo(Category)
Category.hasMany(Product)

Order_Detail.belongsTo(Product)
Product.hasMany(Order_Detail)

Order.belongsTo(User)
User.hasMany(Order)

Order_Detail.belongsTo(Order)
Order.hasMany(Order_Detail)

module.exports = {
  User,
  Product,
  Category,
  Order,
  Order_Detail
}
