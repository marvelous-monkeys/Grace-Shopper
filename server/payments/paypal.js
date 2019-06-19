const router = require('express').Router()
const paypal = require('paypal-rest-sdk')
const {Order, OrderProduct, Product} = require('../db/models')
const Sequelize = require('sequelize')

paypal.configure({
  mode: process.env.PAYPAL_MODE,
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET
})

router.post('/pay', async (req, res, next) => {
  if (req.body.orderId) {
    let payment = null
    let order = null
    try {
      order = await Order.findOne({
        where: {id: +req.body.orderId},
        include: {model: OrderProduct, include: {model: Product}}
      })
      if (order.orderProducts) {
        const items = order.orderProducts.map(el => {
          const item = {}
          item.name = el.product.name
          item.price = el.product.price
          item.quantity = el.quantity
          item.currency = 'USD'
          return item
        })
        payment = {
          intent: 'sale',
          payer: {
            payment_method: 'paypal'
          },
          redirect_urls: {
            return_url: 'http://localhost:8080/payments/paypal/success',
            cancel_url: 'http://localhost:8080/payments/paypal/cancel'
          },
          transactions: [
            {
              item_list: {items},
              amount: {
                currency: 'USD',
                total: order.totalAmount
              },
              description: 'The best poitions'
            }
          ]
        }
        if (payment) {
          paypal.payment.create(payment, async function(err, paym) {
            if (err) {
              console.error(err)
              throw 'Paypal error'
            } else {
              let approvalUrl = paym.links.find(el => el.rel === 'approval_url')
                .href
              await order.update({paypalPaymentId: paym.id})
              res.send(approvalUrl)
            }
          })
        }
      }
    } catch (e) {
      next(e)
    }
  }
})

router.get('/success', async (req, res, next) => {
  try {
    let paypalPaymentId = req.query.paymentId
    const order = await Order.findOne({where: {paypalPaymentId}})
    console.log('order.payment===false :', order.payment === false)
    if (order && order.payment === false) {
      const paymentDate = Sequelize.fn('NOW')
      await order.update({payment: true, paymentDate})
    } else {
      throw 'error'
    }
    res.redirect('/PaymentSuccess')
  } catch (e) {
    next(e)
  }
})

router.get('/cancel', (req, res, next) => {
  res.redirect('/PaymentFail')
})

module.exports = router
