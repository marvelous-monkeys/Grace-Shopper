const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  streetName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 2]
    }
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5, 5],
      is: /^[0-9]+$/i
    }
  }
})

module.exports = Address
