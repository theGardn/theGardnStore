const router = require('express').Router()
const { Order, Order_Detail } = require('../db/models')

// add to cart - user = post / guest = local storage

// separate 'checkout route' for both users / guests

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findOrCreate({
        where: {
          userId: 3,
          purchased: false
        }
      })
      const { productId, quantity, price } = req.body
      const orderDetails = await Order_Detail.create({
        productId,
        quantity,
        price,
        orderId: order[0].dataValues.id
      })
      res.status(201).json(orderDetails)
    }
  } catch (err) {
    next(err)
  }
})



module.exports = router

