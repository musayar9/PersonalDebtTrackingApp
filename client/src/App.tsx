import React from 'react'
import { NavbarComponent } from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
      <NavbarComponent />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route />
      </Routes>
    </div>
  );
}

export default App