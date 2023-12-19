import React from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Coach from "../../visitors/assets/coach.png";
import axios from "axios";
import "../styling/modal.css";
import API_URL from "../../../components/navbar-visitor/apiConfig";
import MessagePopup from "../../../components/navbar-visitor/MessagePopup";

const AdminCoaches = () => {
  // const navigate = useNavigate();
  const [coaches, setCoaches] = useState([]);
  const [approved, setApproved] = useState(false);
  const [approvedError, setApprovedError] = useState(false);
  const [denied, setDenied] = useState(false);
  const [deniedError, setDeniedError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/requests`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setCoaches(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(coaches);

  const handleApprove = (coach) => {
    const vis = {
      visible: 0,
    };
    axios
      .put(`${API_URL}/admincc/${coach.coachexpID}`, vis, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Updated user:", response.data, " Approved Coach");
        setApproved(true);
      })
      .catch((error) => {
        setApprovedError(true);
        console.error("There was a problem with the axios request:", error);
      });
  };

  const handleDeny = (coach) => {
    const vis = {
      visible: 1,
    };
    axios
      .put(`${API_URL}/admincc/${coach.coachexpID}`, vis, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Updated user:", response.data, " Denied Coach");
        setDenied(true);
      })
      .catch((error) => {
        setDeniedError(true);
        console.error("There was a problem with the axios request:", error);
      });
  };
  return (
    <div className="ac-page-body">
      <ClientNavbar />
      {coaches.length === 0 ? (
        <div className="ac-no-coaches-message">
          <h1 style={{ color: "white" }}>No Coaches Requesting...</h1>
        </div>
      ) : (
        coaches.map((coach) => (
          <div key={coach.coachexpID} className="ac-coach-profile-container">
            <div className="ac-coach-profile-content">
              <img
                className="ac-profile-image"
                src={Coach}
                alt="coach profile"
              />
              <div className="ac-profile-details">
                <name className="ac-coach-name" style ={{ fontSize: '36px', fontFamily: 'Copperplate, Papyrus, fantasy', color: 'black' }}>
                  {coach.firstname} {coach.lastname}
                </name>
                <price className="ac-coach-price" style ={{ fontSize: '18px', fontFamily: 'Copperplate, Papyrus, fantasy', color: 'black' }}>Price: ${coach.price}</price>
                <gym className="ac-coach-gym">Gym: {coach.gym}</gym>
              </div>
              <div className="ac-location-experience-container" style ={{ fontSize: '18px', fontFamily: 'Copperplate, Papyrus, fantasy', color: 'black' }}>
                <div className="ac-location-details">
                  <town className="ac-coach-town">Town: {coach.town} </town>
                  <state className="ac-coach-state">State: {coach.state} </state>
                </div>
                <div className="ac-experience-ratings" style ={{ fontSize: '18px', fontFamily: 'Copperplate, Papyrus, fantasy', color: 'black' }}>
                  <experience className="ac-coach-experience">Experience: {coach.experience} </experience>
                  <ratings className="ac-coach-ratings">Ratings: {coach.rating}</ratings>
                </div>
              </div>
              <div className="ac-action-buttons-container" style ={{ fontSize: '18px', fontFamily: 'Copperplate, Papyrus, fantasy', color: 'black' }}>
                <div className="ac-contact-details">
                  <contact className="ac-contact-label" style ={{ fontSize: '18px', fontFamily: 'Copperplate, Papyrus, fantasy', color: 'black' }}>CONTACT </contact>
                  <email className="ac-coach-email" style ={{ fontSize: '18px', fontFamily: 'Copperplate, Papyrus, fantasy', color: 'black' }}>Email: {coach.email}</email>
                </div>
                <button className="ac-approve-button" onClick={() => handleApprove(coach)}>Approve</button>
                <button className="ac-deny-button" onClick={() => handleDeny(coach)}>Deny</button>
              </div>
            </div>
            {approved && (
              <MessagePopup message="Approved Coach Successfully!" />
            )}
            {approvedError && (
              <MessagePopup message="Failed to Approve Coach!" />
            )}
            {denied && <MessagePopup message="Denied Coach Successfully!" />}
            {deniedError && <MessagePopup message="Failed to Deny Coach!" />}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminCoaches;
