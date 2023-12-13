import React, { useEffect, useState } from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "../styling/clienthome.css";
import API_URL from "../../../components/navbar-visitor/apiConfig";

function ClientHome() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const id = Cookies.get("id");

  useEffect(() => {
    axios
      .get(`${API_URL}/clients/${id}`)
      .then((response) => {
        setFirstName(response.data[0].firstname);
        setLastName(response.data[0].lastname);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  //Need to Import the UsersName/ID

  return (
    <div className="client-home">
      <ClientNavbar />
      <div className="container-h1">
        <h1>Home Page</h1>
      </div>
      <div className="container-p9">
        <p9>Welcome to BitFit, Health for everyone!</p9>
      </div>
      <h3 className="h3-firstname">{firstName}</h3>
      <h3 className="h3-lastname">{lastName}</h3>
      <div className="workout-button">
        <Link to="/workouts">
          <button>Create Workout</button>
        </Link>
      </div>
      <div className="button-container">
        <Link to="/workouts">
          <button to="/workouts">Track my Workout</button>
        </Link>
        <Link to="/dailylog">
          <button>Daily Log</button>
        </Link>
        <Link to="/clientcoaches">
          <button to="/clientcoaches">Hire New Coach</button>
        </Link>
      </div>
    </div>
  );
}

export default ClientHome;
