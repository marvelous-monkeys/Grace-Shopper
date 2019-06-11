const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: 1,
    validate: {
      min: 0
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://banner2.kisspng.com/20180423/jge/kisspng-potion-minecraft-clip-art-potions-clipart-5ade4ef7b51e03.9718585115245186477419.jpg'
  }
})

module.exports = Product
