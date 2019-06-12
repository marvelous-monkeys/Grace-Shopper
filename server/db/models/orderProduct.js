const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProducts', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderProduct
