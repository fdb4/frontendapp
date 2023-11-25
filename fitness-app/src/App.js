import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

//imports for visitor
import Home from "./roles/visitors/pages/home.js";
import Services from "./roles/visitors/pages/services.js";
import Coaches from "./roles/visitors/pages/coaches.js";
import About from "./roles/visitors/pages/about.js";
import Login from "./roles/visitors/login.js";
import Registration from "./roles/visitors/registration.js";

//imports for clients login
import ClientHome from "./roles/client/pages/clienthome.js";
import DailyActivity from "./roles/client/pages/dailyactivity.js";
import Messages from "./roles/client/pages/profile/messages.js";
import Workouts from "./roles/client/pages/workouts.js";
import ClientCoaches from "./roles/client/pages/clientcoaches.js";
import Settings from "./roles/client/pages/profile/settings.js";
import MyProfile from "./roles/client/pages/profile/myprofile.js";
import Inbox from "./roles/client/pages/profile/inbox.js"


//import for Coaches login
import Clients from "./roles/coach/pages/clients.js";




import { AuthProvider } from "./components/navbar-visitor/auth.js";
import CoachProfile from './roles/client/pages/coachprofile.js';
import RequireAuth from "./components/navbar-visitor/requireauth.js";
import CoachSurvey from "./roles/visitors/pages/coachsurvey.js";

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

        //coach's profile based on id.
        <Route path="/coaches/:id" element={<RequireAuth><CoachProfile /></RequireAuth>}  />


        /* Routes for client's profile */
        <Route
          path="/myprofile" element={<RequireAuth><MyProfile/>  </RequireAuth>}/>    
        <Route
          path="/inbox" element={<RequireAuth><Inbox/></RequireAuth>} />  
        <Route
          path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
        <Route
          path="/clients" element={<RequireAuth><Clients /></RequireAuth>} />

        // survey
        <Route path="/coachsurvey" element={<RequireAuth><CoachSurvey /></RequireAuth>} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
