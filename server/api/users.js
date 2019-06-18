const router = require('express').Router()
const {User} = require('../db/models')
const isAuthenticated = require('./util')

module.exports = router

router.get('/', isAuthenticated, async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
  try {
    const users = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      streetName: req.body.streetName,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      password: req.body.password
    })
    res.json({
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const deletedUser = await User.destroy({
      where: {id: +req.params.id}
    })
    if (deletedUser) res.status(204).send('Succssfully deleted user.')
  } catch (error) {
    next(error)
  }
})
