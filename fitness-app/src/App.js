import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './roles/visitors/pages/home';
import Services from './roles/visitors/pages/services';
import Coaches from './roles/visitors/pages/coaches';
import About from './roles/visitors/pages/about';
import Login from './roles/visitors/login';
import Registration from './roles/visitors/registration';
import ClientHome from './roles/client/pages/clienthome';
import DailyActivity from './roles/client/pages/dailyactivity';
import Messages from './roles/client/pages/messages';
import Workouts from './roles/client/pages/workouts';
import ClientCoaches from './roles/client/pages/clientcoaches';
import Settings from './roles/client/pages/settings';
import Clients from './roles/coach/pages/clients';
import { Link } from 'react-router-dom';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic
    // After successful login, setLoggedIn(true) and navigate to /clienthome
    setLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/coaches' element={<Coaches />} />
        <Route path='/about' element={<About />} />
        <Route path="/registration" element={<Registration />} />

        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        {/* Protected Routes */}
        <Route
          path="/clienthome"
          element={isLoggedIn ? <ClientHome /> : <Navigate to="/login" />}
        />
        <Route
          path="/dailyactivity"
          element={isLoggedIn ? <DailyActivity /> : <Navigate to="/login" />}
        />
        <Route
          path="/messages"
          element={isLoggedIn ? <Messages /> : <Navigate to="/login" />}
        />
        <Route
          path="/workouts"
          element={isLoggedIn ? <Workouts /> : <Navigate to="/login" />}
        />
        <Route
          path="/clientcoaches"
          element={isLoggedIn ? <ClientCoaches /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={isLoggedIn ? <Settings /> : <Navigate to="/login" />}
        />
        <Route
          path="/clients"
          element={isLoggedIn ? <Clients /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
