const router = require('express').Router()

router.use('/paypal', require('./paypal'))

module.exports = router
