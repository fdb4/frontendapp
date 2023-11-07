import React from 'react';
import './App.css';
import Navbar from './components/navbar-visitor/index.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './roles/visitors/pages/home.js';
import Services from './roles/visitors/pages/services.js';
import Coaches from './roles/visitors/pages/coaches.js';
import About from './roles/visitors/pages/about.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/coaches' element={<Coaches />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;