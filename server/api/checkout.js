const router = require('express').Router()
const {Order, Order_Detail} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const guestOrder = await Order.create()
    const orderId = guestOrder[0].dataValues.id
    const guestCart = req.body.cart
    guestCart.map(async product => {
      const newOrderDetail = await Order_Detail.create({
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
        orderId: orderId
      })
    })
    res.status(201).json(guestOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const sessionId = req.user.id
    const userId = req.body.userId
    if (sessionId === userId) {
      const checkout = await Order.update(
        {
          purchased: true
        },
        {
          where: {
            userId: userId
          }
        }
      )
      res.status(200).json(checkout)
    }
  } catch (err) {
    next(err)
  }
})
