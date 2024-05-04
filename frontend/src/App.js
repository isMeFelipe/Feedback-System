import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Components/Homepage'
import AdminPage from './Components/AdminPage'
import UserPage from './Components/UserPage'
import FeedbackPage from './Components/FeedbackPage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/AdminPage' element={<AdminPage />} />
        <Route path='/UserPage' element={<UserPage />} />
        <Route path='/FeedbackPage' element={<FeedbackPage/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
