import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import ProductList from './components/ProductList'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
