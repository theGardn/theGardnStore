const router = require('express').Router()
const { Order } = require('../db/models')
module.exports = router

// if guest do a post???

router.put('/', async (req, res, next) => {
  try {
    if (req.user) {
      const checkout = await Order.update({
        purchased: true
      }, {
          where: {
            userId: req.user.id
          }
        }
      )
      res.status(200).json(checkout)
    }
  } catch (err) {
    next(err)
  }
})


