const router = require('express').Router()
const {Product} = require('../db/models')
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

router.put('/:id', async (req, res, next) => {
  const {id, name, price, description, imageUrl} = req.body
  try {
    const [numOfRowsUpdated, affectedRows] = await Product.update(
      {
        id,
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
    if (!affectedRows[0]) res.status(404).send('404 ERROR: Invalid product ID.')
    else res.send(affectedRows[0])
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedItem = await Product.destroy({
      where: {id: +req.params.id}
    })
    if (deletedItem) res.send('Successfully deleted item: ', deletedItem)
  } catch (error) {
    next(error)
  }
})
