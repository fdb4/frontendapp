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
import InitialSurveyPage from "./roles/visitors/initialsurveypage.js"
import { Link } from "react-router-dom";
import { AuthProvider } from "./components/navbar-visitor/auth.js";
import CoachProfile from './roles/client/pages/coachprofile.js';
import RequireAuth from "./components/navbar-visitor/requireauth.js";
import DailyLog from "./roles/visitors/dailylog.js"

function App() {
  // const [isLoggedIn, setLoggedIn] = useState(false);

  // const handleLogin = () => {

  //   setLoggedIn(true);

  // };

  // const handleLogin = () => {
  //   Perform login logic
  //   After successful login, setLoggedIn(true) and navigate to /clienthome
  //   setLoggedIn(true);
  // };


  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/login" element={<Login onLogin={handleLogin} />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* Protected Routes */}
        <Route path="/clienthome" element={<RequireAuth><ClientHome /></RequireAuth>} />
        <Route path="/dailyactivity" element={<RequireAuth><DailyActivity /></RequireAuth>} />
        <Route path="/messages" element={<RequireAuth><Messages /></RequireAuth>} />
        <Route path="/workouts" element={<RequireAuth><Workouts /></RequireAuth>} />
        <Route path="/clientcoaches" element={<RequireAuth><ClientCoaches /></RequireAuth>} />
        <Route path="/dailylog" element={<RequireAuth><DailyLog /></RequireAuth>} />
        

        //coach's profile based on id.
        <Route path="/coaches/:id" element={<RequireAuth><CoachProfile /></RequireAuth>}  />
       
        <Route
          path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
        <Route
          path="/clients" element={<RequireAuth><Clients /></RequireAuth>} />
        <Route
          path="/initialsurveypage" element={<RequireAuth><InitialSurveyPage /></RequireAuth>} /> 

        //Survey Page
        <Route
          path="/initialsurveypage" element={<InitialSurveyPage />} />      
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
