const router = require('express').Router()
const { Order, Order_Detail, Product } = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const sessionId = req.user.id
    const userId = req.params.userId
    if (sessionId == userId) {
      const cartItems = await Order.findOne({
        where: {
          userId: req.user.id,
          purchased: false
        },
        include: [
          {
            model: Order_Detail,
            include: [
              {
                model: Product
              }
            ]

          }
        ]
      })
      res.status(200).json(cartItems)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const sessionId = req.user.id
    const userId = req.body.userId
    if (sessionId == userId) {
      const { quantity, id } = req.body.item
      const updateQuantity = await Order_Detail.update(
        { quantity: quantity },
        {
          where: { id: id }
        }
      )
      res.status(200).json(updateQuantity)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const sessionId = req.user.id
    const userId = req.body.userId
    if (sessionId == userId) {
      const order = await Order.findOrCreate({
        where: {
          userId: userId,
          purchased: false
        }
      })
      const { id, quantity, price } = req.body.item
      const productId = id;
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
    const orderDetailId = req.body.item.id
    const userId = req.user.id
    const sessionId = req.body.user.id
    if (sessionId == userId) {
      await Order_Detail.destroy({
        where: {
          id: orderDetailId
        }
      })
      res.status(204).end()
    }

  } catch (err) {
    next(err)
  }
})
