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
import Workouts from "./roles/visitors/pages/workouts.js";
import Login from "./roles/visitors/login.js";
import Registration from "./roles/visitors/registration.js";
import Unauthorized from "./roles/visitors/pages/unauthorized.js";


//imports for clients login
import ClientSurvey from "./roles/client/pages/initialsurvey/clientsurvey.js"
import ClientHome from "./roles/client/pages/clienthome.js";
import DailyLog from "./roles/client/pages/dailylog.js";
import Myworkouts from "./roles/client/pages/workouts/myworkouts.js";
import ClientCoaches from "./roles/client/pages/clientcoaches.js";
import CoachProfile from './roles/client/pages/coachprofile.js';
import MyProfile from "./roles/client/pages/profile/myprofile.js";
import Inbox from "./roles/client/pages/profile/inbox.js"
import Messages from "./roles/client/pages/profile/messages.js";
import Settings from "./roles/client/pages/profile/settings.js";



//import for Coaches login
import CoachSurvey from "./roles/coach/pages/intialsurvey/coachsurvey.js";
import CoachClient from "./roles/coach/pages/coachclient.js";
import ClientProfile from "./roles/coach/pages/clientprofile.js"
import { AuthProvider } from "./components/navbar-visitor/auth.js";
import RequireAuth from "./components/navbar-visitor/requireauth.js";
import CoachSurveyCheck from "./components/navbar-visitor/coachsurveycheck.js";
import ClientSurveyCheck from "./components/navbar-visitor/clientsurveycheck.js";


//import CoachProfile from './roles/client/pages/coachprofile.js';
//import RequireAuth from "./components/navbar-visitor/requireauth.js"; 


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
        {/*visitors routes. */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/about" element={<About />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* login & registration */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/*initial survey routes based on user login */}
        <Route path="/clientsurvey" element={<RequireAuth allowedRoles = {['Client', 'Coach', 'Admin']}><ClientSurveyCheck><ClientSurvey /></ClientSurveyCheck></RequireAuth>} /> 
        <Route path="/coachsurvey" element={<RequireAuth allowedRoles = {['Coach', 'Admin']}><CoachSurveyCheck><CoachSurvey /></CoachSurveyCheck></RequireAuth>} />

        {/* Protected Routes for client */}
        <Route path="/clienthome" element={<RequireAuth allowedRoles = {['Client', 'Coach', 'Admin']}><ClientHome /></RequireAuth>} />
        <Route path="/dailylog" element={<RequireAuth allowedRoles = {['Client', 'Coach', 'Admin']}><DailyLog /></RequireAuth>} />
        <Route path="/my-workouts" element={<RequireAuth allowedRoles = {['Client', 'Coach', 'Admin']}><Myworkouts /></RequireAuth>} />
        <Route path="/clientcoaches" element={<RequireAuth allowedRoles = {['Client', 'Coach', 'Admin']}><ClientCoaches /></RequireAuth>} />
          <Route path="/coaches/:id" element={<RequireAuth allowedRoles = {['Client', 'Coach', 'Admin']}><CoachProfile /></RequireAuth>}  />
        {/* Routes for client's profile */}
        <Route path="/myprofile" element={<RequireAuth allowedRoles = {['Client', 'Coach', 'Admin']}><MyProfile/></RequireAuth>}/>    
        <Route path="/inbox" element={<RequireAuth allowedRoles = {['Client', 'Coach', 'Admin']}><Inbox/></RequireAuth>} />  
        <Route path="/messages" element={<RequireAuth allowedRoles = {['Client', 'Coach', 'Admin']}><Messages /></RequireAuth>} />
        <Route path="/settings" element={<RequireAuth allowedRoles = {['Client', 'Coach', 'Admin']}><Settings /></RequireAuth>} />


        {/* Protected Routes for coach */}
        <Route path="/coachhome" element={<RequireAuth allowedRoles = {['Coach', 'Admin']}><CoachClient/></RequireAuth>} />
          <Route path="/coaches/:id" element={<RequireAuth allowedRoles = {['Client', 'Coach', 'Admin']}><ClientProfile /></RequireAuth>}  />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
