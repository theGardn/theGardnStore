const router = require('express').Router()
const {Category} = require('../db/models/')

router.get('/', async (req, res, next) => {
  try {
    const products = await Category.findAll()
    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
})

module.exports = router
