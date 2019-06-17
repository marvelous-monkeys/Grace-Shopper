const router = require('express').Router()
const {Order, OrderProduct} = require('../db/models')

router.post('/', (req, res, next) => {
  if (req.user) {
    userId = req.user.dataValues.id
  } else {
    userId = null
  }
  try {
    const order = Order.create(
      {
        totalAmount: req.body.totalAmount,
        orderProducts: req.body.allProducts,
        userId
      },
      {include: [OrderProduct]}
    )
    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
