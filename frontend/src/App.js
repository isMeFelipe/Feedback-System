import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Components/Homepage'
import AdminPage from './Components/AdminPage'
import UserPage from './Components/UserPage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/AdminPage' element={<AdminPage />} />
        <Route path='/UserPage' element={<UserPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
