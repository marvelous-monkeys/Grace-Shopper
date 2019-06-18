import React from 'react'

const PaymentFail = () => {
  setTimeout(() => window.close(), 3000)
  return (
    <div>
      <h1>Error in the payment, please try again.</h1>
      <h2> Window will be closed in 3 seconds.</h2>
      <button onClick={() => window.close()}>Close immediately</button>
    </div>
  )
}

export default PaymentFail
