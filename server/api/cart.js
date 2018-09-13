const router = require('express').Router()
const { Order, Order_Detail } = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const sessionId = req.user.id
    const userId = req.params.userId
    if (sessionId === userId) {
      const cartItems = await Order.findOne({
        where: {
          userId: req.user.id,
          purchased: false
        },
        include: [{ model: Order_Detail }]
      })
      res.status(200).json(cartItems)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const sessionId = req.user.id
    const userId = req.body.userId
    if (sessionId === userId) {
      const order = await Order.findOrCreate({
        where: {
          userId: userId,
          purchased: false
        }
      })
      const { productId, quantity, price } = req.body.item
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

router.delete('/', async (req, res, next) => {
  try {
    const orderDetailId = req.body.id
    const userId = req.user.id
    const sessionId = req.body.userId
    if (sessionId === userId) {
      const deleteItem = await Order_Detail.destroy({
        where: {
          id: orderDetailId
        }
      })
    }
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
