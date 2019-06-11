const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// gets all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    // res.send("Here's a list of all products...")
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// gets products based on product ID
router.get('/:id', async (req, res, next) => {
  try {
    const produtctID = req.params.id
    const product = await Product.findById(produtctID)
    res.json(product)
  } catch (err) {
    next(err)
  }
})