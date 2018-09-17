const router = require('express').Router()
const {User, Order, Order_Detail} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/order', async (req, res, next) => {
  // console.log("**********User order history hit!***********")
  try {
    const sessionId = req.user.id
    const userId = req.params.userId
    // console.log(userId)
    // console.log(sessionId)
    if (sessionId == userId) {
      const orderHistory = await Order.findAll({
        where: {
          userId: userId
        },
        include: [{model: Order_Detail}]
      })
      res.status(200).json(orderHistory)
    } else {
      res.status(200).json({data:[]})
      // console.log("return empty")
    }
  } catch (err) {
    next(err)
  }
})
