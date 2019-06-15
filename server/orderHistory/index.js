const router = require('express').Router()
const {Order, OrderProduct} = require('../db/models')

router.get('/', (req, res, next) => {
  try {
    if (!req.user) {
      throw 'Must be logged in to access order history'
    } else {
      const allUserOrders = Order.findAll({
        where: {
          userId: req.user.dataValues.id
        }
      })
      res.json(order)
    }
  } catch (error) {
    res.status(404).send(error)
  }
})

module.exports = router
