'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderProduct} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'thePug',
      streetName: 'Pug Lane',
      city: 'Pug City',
      state: 'NY',
      zipcode: '11530',
      isAdmin: true
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'theSnake',
      streetName: 'Snake Lane',
      city: 'Snake City',
      state: 'NY',
      zipcode: '03511'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'PassionForLife',
      price: 30,
      description: "Lover's potion",
      imageUrl:
        'https://cdn2.vectorstock.com/i/1000x1000/26/16/bottle-with-love-potion-icon-magic-elixir-design-vector-19692616.jpg'
    }),
    Product.create({
      name: 'Blood Vial',
      price: 28,
      description: 'A hunters dream',
      imageUrl:
        'https://4.bp.blogspot.com/-WKoFpdrvpeY/VkfgWnobECI/AAAAAAAAL2M/PwJBdUwegt0/s250/01.%2BBlood%2BVial.png'
    }),
    Product.create({
      name: 'Black Magic',
      price: 45,
      description: 'Revenge is sweet',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51mWqbc-AjL._SY550_.jpg'
    }),
    Product.create({
      name: 'Medicines of Life',
      price: 32,
      description: 'Become the Hero of Time',
      imageUrl:
        'https://gamepedia.cursecdn.com/zelda_gamepedia_en/4/41/TWW_Red_Potion_Artwork.png'
    }),
    Product.create({
      name: 'Hyper Potion',
      price: 60,
      description: 'Restore 200HP!',
      imageUrl:
        'http://weblab.springfieldcollege.edu/arts103/arts320/bestof320f16/final-danielle/images/hyperpotion.jpg'
    }),
    Product.create({
      name: 'Slurp Juice',
      price: 45,
      description: 'Squad up',
      imageUrl:
        'https://tipsybartender.com/wp-content/uploads/2019/01/fortnite-slurp-juice.jpg'
    })
  ])

  const orders = await Promise.all([
    Order.create(
      {
        totalAmount: 100,
        orderProducts: [
          {quantity: 2, productId: 2},
          {quantity: 3, productId: 1}
        ]
      },
      {include: [OrderProduct]}
    )
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
