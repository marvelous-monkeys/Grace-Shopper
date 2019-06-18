const router = require('express').Router()
const {Product} = require('../db/models')
const isAuthenticated = require('./util')

module.exports = router

// gets all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const {id, name, price, description, imageUrl} = req.body
    const newProduct = await Product.create({
      id,
      name,
      price,
      description,
      imageUrl
    })
    if (!newProduct) res.send('Product was not created.')
    else res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

// gets products based on product ID
router.get('/:id', async (req, res, next) => {
  try {
    const produtctID = req.params.id
    const product = await Product.findByPk(+produtctID)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const deletedItem = await Product.destroy({
      where: {id: req.params.id}
    })
    if (!deletedItem) res.status(404).send('Item ID not found')
    else res.status(204).send('Successful Deletion of item.')
  } catch (error) {
    next(error)
  }
})

router.put('/:id', isAuthenticated, async (req, res, next) => {
  const {name, price, description, imageUrl} = req.body
  try {
    const [numOfRowsUpdated, updatedProduct] = await Product.update(
      {
        name,
        price,
        description,
        imageUrl
      },
      {
        where: {id: req.params.id},
        returning: true
      }
    )
    if (!updatedProduct[0])
      res.status(404).send('404 ERROR: Invalid product ID.')
    else res.json(updatedProduct[0])
  } catch (error) {
    next(error)
  }
})
