const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalAmount: {
    type: Sequelize.INTEGER
  },
  payment: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  paymentDate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  paypalPaymentId: {
    type: Sequelize.STRING
  }
})

module.exports = Order
