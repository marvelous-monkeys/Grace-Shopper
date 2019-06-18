const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
const {
  GOOGLE_CALLBACK,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} = require('../../secrets')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

process.env.GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID
process.env.GOOGLE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET
process.env.GOOGLE_CALLBACK = GOOGLE_CALLBACK

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.')
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://gs-potion-store.herokuapp.com/auth/google/callback',
    scope: ['email']
  }

  const strategy = new GoogleStrategy(
    googleConfig,
    (token, refreshToken, profile, done) => {
      const googleId = profile.id
      const firstName = 'Please Update'
      const lastName = 'Please Update'
      const email = profile.emails[0].value
      const streetName = 'Please Update'
      const city = 'Please Update'
      const state = 'NY'
      const zipcode = '12345'

      User.findOrCreate({
        where: {googleId},
        defaults: {firstName, lastName, email, streetName, city, state, zipcode}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('google', {scope: 'email'}))

  router.get(
    '/callback',
    passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/signup'
    })
  )
}
