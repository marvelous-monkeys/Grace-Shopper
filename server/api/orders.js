const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (!req.user) {
      throw 'Must be logged in to access order history'
    } else {
      const allUserOrders = await Order.findAll({
        where: {
          userId: req.user.dataValues.id
        },
        include: [
          {
            model: OrderProduct,
            include: [Product]
          }
        ]
      })
      res.json(allUserOrders)
    }
  } catch (error) {
    res.status(404).send(error)
  }
})

router.post('/', (req, res, next) => {
  try {
    if (req.user) {
      userId = req.user.dataValues.id
    } else {
      throw 'Must be signed in the create order'
    }
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
