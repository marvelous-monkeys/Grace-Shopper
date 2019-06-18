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

// import axios from 'axios'

// const Order = (props) => {
//   const createPayment = (orderId)=>{
//     axios.post('payments/paypal/pay', {orderId}).then(({data})=>{
//       window.open(data, 'sharer', 'toolbar=0,status=0,width=548,height=750')
//     })
//   }
//   const order = props.order
//   return (
//     <div>
//       <h1> Order #{order.id}</h1>
//       <h2>Ordered on: {new Date(order.createdAt).toString().slice(0, 15)}</h2>
//       {order.orderProducts.map((el, i) => (
//         <OrderProduct key={i} product={el.product} />
//       ))}
//       <button onClick={()=>createPayment(order.id)}>Pay This One!</button>
//     </div>
//   )
// }
