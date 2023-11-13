import React from 'react';
import './App.css';
import Navbar from './components/navbar-visitor/vistornav.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './roles/visitors/pages/home.js';
import Services from './roles/visitors/pages/services.js';
import Coaches from './roles/visitors/pages/coaches.js';
import About from './roles/visitors/pages/about.js';
import Login from './roles/visitors/login.js';
import Registration from './roles/visitors/registration.js';
import ClientHome from './roles/client/pages/clienthome';
import DailyActivity from './roles/client/pages/dailyactivity';
import Messages from './roles/client/pages/messages';
import Workouts from './roles/client/pages/workouts';
import ClientCoaches from './roles/client/pages/clientcoaches';
import Settings from './roles/client/pages/settings';
import Clients from './roles/coach/pages/clients';

function App() {
  return (
    <Router>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/coaches' element={<Coaches />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/clienthome" element={<ClientHome />} />
        <Route path="/dailyactivity" element={<DailyActivity />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/clientcoaches" element={<ClientCoaches />} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/clients" element={<Clients/>} />
      </Routes> 
    </Router>
  );
}

export default App;