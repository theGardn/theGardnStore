const router = require('express').Router()
const {Order, Order_Detail} = require('../db/models')
module.exports = router

router.get('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const order = await Order.findById(orderId, {
      include: [{model: Order_Detail}]
    })
    res.status(200).json(order)
  } catch (err) {
    next(err)
  }
})
