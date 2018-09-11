'use strict'

const db = require('../server/db')
const { User, Product, Category, Order, Order_Detail } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Pug',
      email: 'cody@email.com',
      password: '123',
      isLoggedIn: false,
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'FullStack',
      email: 'murphy@email.com',
      password: '123',
      isLoggedIn: false,
    }),
    User.create({
      firstName: 'Ryan',
      lastName: 'McNierney',
      email: 'ryan@email.com',
      password: '123',
      isLoggedIn: false,
    }),
    User.create({
      firstName: 'Aaron',
      lastName: 'Ludwin',
      email: 'aaron@email.com',
      password: '123',
      isLoggedIn: false,
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const categories = await Promise.all([
    Category.create({
      name: 'fruit',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Culinary_fruits_front_view.jpg/440px-Culinary_fruits_front_view.jpg'
    }),
    Category.create({
      name: 'vegetable',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Marketvegetables.jpg/440px-Marketvegetables.jpg'
    }),
  ])

  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded successfully`)

  const products = await Promise.all([
    Product.create({
      name: 'apples',
      categoryId: 1,
      price: 1.00,
      quantity: 10,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Honeycrisp.jpg/440px-Honeycrisp.jpg'
    }),
    Product.create({
      name: 'bananas',
      categoryId: 1,
      price: 0.60,
      quantity: 20,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Banana_and_cross_section.jpg/500px-Banana_and_cross_section.jpg'
    }),
    Product.create({
      name: 'grapes',
      categoryId: 1,
      price: 1.50,
      quantity: 40,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Abhar-iran.JPG/340px-Abhar-iran.JPG'
    }),
    Product.create({
      name: 'oranges',
      categoryId: 1,
      price: 2.00,
      quantity: 25,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Orange-Whole-%26-Split.jpg/440px-Orange-Whole-%26-Split.jpg'
    }),
    Product.create({
      name: 'carrots',
      categoryId: 2,
      price: 1.25,
      quantity: 18,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/7carrots.jpg/250px-7carrots.jpg'
    }),
    Product.create({
      name: 'tomatoes',
      categoryId: 2,
      price: 2.25,
      quantity: 26,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/250px-Tomato_je.jpg'
    }),
    Product.create({
      name: 'cucumbers',
      categoryId: 2,
      price: 3.15,
      quantity: 14,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Og%C3%B3rki...jpg/250px-Og%C3%B3rki...jpg'
    }),
    Product.create({
      name: 'onions',
      categoryId: 2,
      price: 2.75,
      quantity: 22,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Garlic.jpg/250px-Garlic.jpg'
    }),
    Product.create({
      name: 'peppers',
      categoryId: 2,
      price: 3.50,
      quantity: 35,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Red_capsicum_and_cross_section.jpg/250px-Red_capsicum_and_cross_section.jpg'
    }),
    Product.create({
      name: 'lettuce',
      categoryId: 2,
      price: 1.15,
      quantity: 50,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Kropsla_herfst.jpg/250px-Kropsla_herfst.jpg'
    })
  ])

  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)

  const orders = await Promise.all([
    Order.create({
      userId: 1,
      purchased: false
    }),
    Order.create({
      userId: 2,
      purchased: false
    }),
    Order.create({
      purchased: false
    }),
    Order.create({
      purchased: false
    })
  ])

  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)

  const orderDetails = await Promise.all([
    Order_Detail.create({
      productId: 1,
      quantity: 2,
      price: 1.00,
      orderId: 1
    }),
    Order_Detail.create({
      productId: 2,
      quantity: 3,
      price: 0.60,
      orderId: 1
    }),
    Order_Detail.create({
      productId: 3,
      quantity: 10,
      price: 1.50,
      orderId: 1
    }),
    Order_Detail.create({
      productId: 7,
      quantity: 5,
      price: 3.15,
      orderId: 1
    }),
    Order_Detail.create({
      productId: 4,
      quantity: 5,
      price: 2.00,
      orderId: 1
    }),
    Order_Detail.create({
      productId: 9,
      quantity: 10,
      price: 3.50,
      orderId: 2
    }),
    Order_Detail.create({
      productId: 10,
      quantity: 3,
      price: 1.15,
      orderId: 2
    }),
    Order_Detail.create({
      productId: 1,
      quantity: 5,
      price: 1.00,
      orderId: 2
    }),
    Order_Detail.create({
      productId: 6,
      quantity: 4,
      price: 2.25,
      orderId: 2
    }),
    Order_Detail.create({
      productId: 3,
      quantity: 6,
      price: 1.50,
      orderId: 3
    }),
    Order_Detail.create({
      productId: 8,
      quantity: 2,
      price: 2.75,
      orderId: 3
    }),
    Order_Detail.create({
      productId: 2,
      quantity: 5,
      price: 0.60,
      orderId: 3
    }),
    Order_Detail.create({
      productId: 5,
      quantity: 7,
      price: 1.25,
      orderId: 4
    })
  ])

  console.log(`seeded ${orderDetails.length} order details`)
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
