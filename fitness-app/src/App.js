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
import ClientSurvey from "./roles/client/pages/initialsurvey/clientsurvey.js"
import ClientHome from "./roles/client/pages/clienthome.js";
import DailyLog from "./roles/client/pages/dailylog.js";
import Workouts from "./roles/client/pages/workouts.js";
import ClientCoaches from "./roles/client/pages/clientcoaches.js";
import CoachProfile from './roles/client/pages/coachprofile.js';
import MyProfile from "./roles/client/pages/profile/myprofile.js";
import Inbox from "./roles/client/pages/profile/inbox.js"
import Messages from "./roles/client/pages/profile/messages.js";
import Settings from "./roles/client/pages/profile/settings.js";



//import for Coaches login
import CoachSurvey from "./roles/coach/pages/intialsurvey/coachsurvey.js";
import CoachHome from "./roles/coach/pages/coachhome.js";
import { AuthProvider } from "./components/navbar-visitor/auth.js";
import RequireAuth from "./components/navbar-visitor/requireauth.js";
import CoachSurveyCheck from "./components/navbar-visitor/coachsurveycheck.js";


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

        {/* login & registration */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/*initial survey routes based on user login */}
        <Route path="/clientsurvey" element={<RequireAuth><ClientSurvey /></RequireAuth>} /> 
        <Route path="/coachsurvey" element={<RequireAuth><CoachSurveyCheck><CoachSurvey /></CoachSurveyCheck></RequireAuth>} />

        {/* Protected Routes for client */}
        <Route path="/clienthome" element={<RequireAuth><ClientHome /></RequireAuth>} />
        <Route path="/dailylog" element={<RequireAuth><DailyLog /></RequireAuth>} />
        <Route path="/workouts" element={<RequireAuth><Workouts /></RequireAuth>} />
        <Route path="/clientcoaches" element={<RequireAuth><ClientCoaches /></RequireAuth>} />
          <Route path="/coaches/:id" element={<RequireAuth><CoachProfile /></RequireAuth>}  />
        {/* Routes for client's profile */}
        <Route path="/myprofile" element={<RequireAuth><MyProfile/></RequireAuth>}/>    
        <Route path="/inbox" element={<RequireAuth><Inbox/></RequireAuth>} />  
        <Route path="/messages" element={<RequireAuth><Messages /></RequireAuth>} />
        <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />


        {/* Protected Routes for coach */}
        <Route path="/coachhome" element={<RequireAuth><CoachHome/></RequireAuth>} />

      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
