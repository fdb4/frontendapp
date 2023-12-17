import React from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Coach from "../../visitors/assets/coach.png";
import axios from "axios";
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
    <div className="body_2">
      <ClientNavbar />
      {coaches.length === 0 ? (
        <div className="body">
          <h1 style={{ color: "white" }}>No Coaches Requesting...</h1>
        </div>
      ) : (
        coaches.map((coach) => (
          <div key={coach.coachexpID}>
            <tr className="profile_2">
              <img
                className="img"
                src={Coach}
                alt="coach profile"
                style={{
                  borderRadius: "50%",
                  width: "10%",
                }}
              />
              <div className="left">
                <name>
                  {coach.firstname} {coach.lastname}
                </name>
                <price>Price: ${coach.price}</price>
                <gym>Gym: {coach.gym}</gym>
              </div>
              <div className="middle">
                <div className="location">
                  <town>Town: {coach.town} </town>
                  <state>State: {coach.state}</state>
                </div>
                <div className="middle_2">
                  <experience>Experience: {coach.experience}</experience>
                  <ratings>Ratings: {coach.rating}</ratings>
                </div>
              </div>

              <div className="right">
                <div className="contact">
                  <contact>CONTACT</contact>
                  <email>Email: {coach.email}</email>
                </div>
                <button onClick={() => handleApprove(coach)}>Approve</button>
                <button onClick={() => handleDeny(coach)}>Deny</button>
              </div>
            </tr>
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
