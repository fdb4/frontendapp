import React, { useEffect, useState } from 'react'
import ClientNavbar from "../../../components/navbar-visitor/clientnav"
import { Link } from 'react-router-dom';
import facebook from "../../visitors/assets/facebook.png"
import instagram from "../../visitors/assets/instagram.png"
import linkedin from "../../visitors/assets/linkedin.png"
import Cookies from 'js-cookie';
import axios from 'axios';

function ClientHome() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const id = Cookies.get('id')

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/clients/${id}`)
        .then((response) => {
            setFirstName(response.data[0].firstname)
            setLastName(response.data[0].lastname)
        })
        .catch((error) => 
            {console.log(error.message)});
        },[]); 
    //Need to Import the UsersName/ID
    
    return(
        <div className="body_1">
            <ClientNavbar />
            <h1>Home Page</h1>
            <p9>Welcome to BitFit, Health for everyone!</p9>
            <h3>{firstName}</h3>
            <h3>{lastName}</h3>
            <div>
                <Link to="/workouts">
                <button>Create Workout</button>
                </Link>
            </div>
            <div>
                <Link to='/workouts'>
                <button to="/workouts">Track my Workout</button>
                </Link>
                <Link to="/dailyactivity">
                <button>Daily Log</button>
                <button>Photo Progression</button>
                </Link>
                <Link to="/clientcoaches">
                <button to="/clientcoaches">Hire New Coach</button>
                </Link>
            </div>
            <div className="footer">
        <h2>
          ADD US ON OUR <br></br>
          <span className="champion">SOCIALS</span>
        </h2>
        <div className="socials">
          <img src={facebook} alt="Dumbbell" />
          <img src={linkedin} alt="linkedin" />
          <img src={instagram} alt="instagram" />
        </div>
        <div className="concerns">
          <p>info@yourdomain.com</p>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
        </div>
      </div>
        </div>
    )
}

export default ClientHome