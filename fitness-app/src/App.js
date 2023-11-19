import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/navbar-visitor/visitornav.js";
import Home from "./roles/visitors/pages/home.js";
import Services from "./roles/visitors/pages/services.js";
import Coaches from "./roles/visitors/pages/coaches.js";
import About from "./roles/visitors/pages/about.js";
import Login from "./roles/visitors/login.js";
import Registration from "./roles/visitors/registration.js";
import ClientHome from "./roles/client/pages/clienthome.js";
import DailyActivity from "./roles/client/pages/dailyactivity.js";
import Messages from "./roles/client/pages/messages.js";
import Workouts from "./roles/client/pages/workouts.js";
import ClientCoaches from "./roles/client/pages/clientcoaches.js";
import Settings from "./roles/client/pages/settings.js";
import Clients from "./roles/coach/pages/clients.js";
import { Link } from "react-router-dom";
import { AuthProvider } from "./components/navbar-visitor/auth.js";
import { RequireAuth } from "./components/navbar-visitor/requireauth.js";
import CoachProfile from './roles/client/pages/coachprofile.js';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic
    // After successful login, setLoggedIn(true) and navigate to /clienthome
    setLoggedIn(true);
    // Redirect to /clienthome
    // navigate('/clienthome');
  };

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/registration" element={<Registration />} />

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
        //coach's profile based on id.
        <Route
          path="/coaches/:id" element={<CoachProfile />}
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
    </AuthProvider>
  );
}

export default App;
