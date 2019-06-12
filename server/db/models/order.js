const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalAmount: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = Order
