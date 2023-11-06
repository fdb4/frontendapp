import React from 'react';
import './App.css';
import Navbar from './components/navbar-visitor/index.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './roles/visitors/pages/home.js';
import Services from './roles/visitors/pages/services.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;