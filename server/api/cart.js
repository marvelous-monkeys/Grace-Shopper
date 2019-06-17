const router = require('express').Router()
const {Cart, Product} = require('../db/models')

router.get('/', (req, res, next) => {
  let where = {}
  if (req.user) {
    where = {...where, userId: req.user.id}
  } else {
    where = {...where, sessionID: req.sessionID}
  }
  Cart.findAll({where, include: {model: Product}})
    .then(data => res.json(data))
    .catch(next)
})

router.put('/', async (req, res, next) => {
  if ((!req.user && !req.sessionID) || !req.body.params.id)
    next('wrong request')
  let where = {}
  let quantity = 1
  if (req.body.params.quantity) quantity = +req.body.params.quantity
  where.productId = +req.body.params.id
  if (req.user) {
    where.userId = req.user.id
  } else {
    where.sessionID = req.sessionID
  }
  try {
    let [cart, wasCreated] = await Cart.findOrCreate({
      where,
      defaults: {...where, quantity}
    })
    if (!wasCreated) {
      quantity = cart.quantity + quantity
      await cart.update({quantity})
    }
  } catch (e) {
    next(e)
  }
  res.sendStatus(204)
})

// eslint-disable-next-line complexity
router.delete('/', async (req, res, next) => {
  let quantity = 1
  if (req.query.quantity) quantity = req.query.quantity
  let where = {}
  if (req.user) {
    where = {...where, userId: req.user.id}
  } else {
    where = {...where, sessionID: req.sessionID}
  }

  if (where.userId || where.sessionID) {
    if (!req.query.id) {
      try {
        await Cart.destroy({where})
      } catch (e) {
        next(e)
      }
    } else {
      where.productId = +req.query.id
      let cart = await Cart.findOne({where})
      if (cart) {
        if (cart.quantity > quantity) {
          await cart.update({quantity: cart.quantity - quantity})
        } else {
          await cart.destroy()
        }
      }
    }
    res.sendStatus(204)
  } else {
    next('server error')
  }
})

module.exports = router
