import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import CurrencyDashboard from './components/CurrencyDashboard'
import CurrencyForm from './components/CurrencyForm'
import PrivateRoutes from './components/PrivateRoutes'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/sign-in' element={<Login />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<CurrencyDashboard />} />
          <Route path='/add-currency' element={<CurrencyForm />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
