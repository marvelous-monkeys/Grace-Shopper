/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      const codysEmail = 'cody@puppybook.com'
      let cody
      beforeEach(async () => {
        cody = await User.create({
          firstName: 'Testy',
          lastName: 'Tester',
          email: codysEmail,
          zipcode: 12345,
          password: 'abc123',
          state: 'CA',
          streetName: 'fake street',
          city: 'San Fran'
        })
        return cody
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('abc123')).to.be.equal(false)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
