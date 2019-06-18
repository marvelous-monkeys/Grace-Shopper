import React from 'react'

const PaymentSucces = () => {
  setTimeout(() => window.close(), 3000)
  return (
    <div>
      <h1> The order has been approved!</h1>
      <h1> Window will be closed in 3 seconds.</h1>
      <button onClick={() => window.close()}>Close immediately</button>
    </div>
  )
}

export default PaymentSucces
