import React from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Coach from "../../visitors/assets/coach.png";
import axios from "axios";

const AdminCoaches = () => {
  const API_URL = "http://127.0.0.1:5000";
  // const navigate = useNavigate();
  const [coaches, setCoaches] = useState([]);

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
    const vis = true;
    axios
      .put(`${API_URL}/admincc/${coach.coachexpID}`, vis, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Updated user:", response.data, " Approved Coach");
      })
      .catch((error) => {
        console.error("There was a problem with the axios request:", error);
      });
  };

  const handleDeny = (coach) => {
    const vis = false;
    axios
      .put(`${API_URL}/admincc/${coach.coachexpID}`, vis, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Updated user:", response.data, " Denied Coach");
      })
      .catch((error) => {
        console.error("There was a problem with the axios request:", error);
      });
  };
  return (
    <div className="body_1">
      Admins Only
      <ClientNavbar />
      {coaches.map((coach) => (
        <tr key={coach.coachexpID}>
          <div className="profile">
            <img className="img" src={Coach} alt="coach profile" />
            <div className="left">
              <name>
                Name: {coach.firstname} {coach.lastname}
              </name>
              <price>Price: ${coach.price}</price>
            </div>
            <div className="right">
              <gym>Gym: {coach.gym}</gym>
              <town>Town: {coach.town}</town>
              <state>State: {coach.state}</state>
            </div>

            <div className="right">
              <experience>Experience: {coach.experience}</experience>
              <ratings>Ratings: {coach.rating}</ratings>
            </div>
            <div className="actions_2">
              <button onClick={() => handleApprove(coach)}>Approve</button>
              <button onClick={() => handleDeny(coach)}>Deny</button>
            </div>
          </div>
        </tr>
      ))}
    </div>
  );
};

export default AdminCoaches;
