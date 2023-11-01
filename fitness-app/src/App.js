import React from 'react';
import './App.css';
import Navbar from './components/navbar-visitor/index.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/vistors/home.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;