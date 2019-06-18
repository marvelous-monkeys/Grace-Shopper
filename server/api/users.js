const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
  let userID
  if (req.user) {
    userID = req.user.id
  } else {
    userID = null
  }

  try {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const streetName = req.body.streetName
    const city = req.body.city
    const state = req.body.state
    const zipcode = req.body.zipcode
    const email = req.body.email
    const password = req.body.password

    await User.update(
      {
        firstName,
        lastName,
        email,
        streetName,
        city,
        state,
        zipcode,
        password
      },
      {
        where: {
          id: userID
        }
      }
    )
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
