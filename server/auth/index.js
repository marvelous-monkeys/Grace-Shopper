const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
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

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
