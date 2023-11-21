import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import "../styling/coachprofile.css";

import { Link } from "react-router-dom";

const CoachProfile = () => {
  const { id } = useParams();
  const [coach, setCoach] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/coaches/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCoach(data[0]); // Assuming the response is an array with a single coach object
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleGoBack = () => {
    // Go back to the previous page in the history
    navigate(-1);
  };

  return (
    <div>
      <div className="body_1">
        <ClientNavbar />
        <h1>Coach Profile</h1>
        <button onClick={handleGoBack}>Back</button>
        {coach && (
          <div className="profile_2">
            <div className="left">
              <name>{coach.firstname} {coach.lastname}</name>
              <age>Age: {coach.age}</age>
              <price>Price: ${coach.price}</price>
              <gym>Gym: {coach.gym}</gym>
            </div>

            <div className="middle">
              <div className="location">
                <town>Town: {coach.town}</town>
                <state>State: {coach.state}</state>
              </div>
            </div>
            
              <div className="info">
                <bio>Description: {coach.bio}</bio>
                <experience>Experience: {coach.experience}</experience>
                <ratings>Ratings: {coach.rating}</ratings>
              </div>

            <div className="right">
              <div className="contact">
                <contact>CONTACT</contact>
                <email>Email: {coach.email}</email>
              </div>
            </div>
            <div className="actions_2">
              <button id="view">
                <Link to={`/messages`} className="view">
                  Send Message
                </Link>
              </button>
              {/* Add more buttons or actions as needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachProfile;
