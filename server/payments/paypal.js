const router = require('express').Router()
const paypal = require('paypal-rest-sdk')
const {Order, OrderProduct} = require('../db')

paypal.configure({
  mode: process.env.PAYPAL_MODE,
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET
})

// paymentDefaults.transactions = [{
//       "item_list": {
//           "items": [{
//               "name": "item",
//               "price": "1.00",
//               "currency": "USD",
//               "quantity": 1
//           }]
//       },
//       "amount": {
//           "currency": "USD",
//           "total": "1.00"
//       },
//       "description": "This is the payment description."
//   }]

const createPayment = async orderId => {
  const payment = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://localhost:8080/paypal/success',
      cancel_url: 'http://localhost:8080/paypal/cancel'
    }
  }
  const orderDetails = await Order.findOne({
    where: {orderId},
    model: {include: OrderProduct}
  })
  // orderDetails
}

// paypal.payment.create(paymentDefaults, function (error, payment) {
//   if (error) {
//       throw error;
//   } else {
//       console.log("Create Payment Response");
//       console.log(payment);
//   }
// });

router.post('/pay', (req, res, next) => {
  if (req.body.orderId) {
    console.log(createPayment(+req.body.orderId))
  }
})

router.get('/success', (req, res, next) => {
  console.log(req)
})

router.get('/cancel', (req, res, next) => {
  res.redirect('/paypal/fail')
})

module.exports = router
