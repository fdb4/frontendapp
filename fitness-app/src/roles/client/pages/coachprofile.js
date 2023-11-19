// // CoachProfile.js
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const CoachProfile = () => {
//   const { id } = useParams();
//   const [coach, setCoach] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:5000/coaches/${id}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setCoach(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!coach) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Coach Profile</h1>
//       {/* Render coach details here */}
//       {/* You can use a similar structure as in your ClientCoaches component */}
//     </div>
//   );
// };

// export default CoachProfile;
// CoachProfile.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import "../styling/clientcoaches.css"; // Import your CSS file for styling

const CoachProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Static data (replace this with your actual data structure)
  const staticCoachData = {
    clientID: id,
    firstname: "John",
    lastname: "Doe",
    age: 30,
    price: 50,
    gym: "Fitness Center",
    town: "Cityville",
    state: "Stateville",
    email: "john.doe@example.com",
    // Add other properties as needed
  };

  const handleGoBack = () => {
    // Go back to the previous page in the history
    navigate(-1);
  };

  return (
    <div className="body_1">
      <ClientNavbar />
      <h1>Coach Profile</h1>
      <button onClick={handleGoBack}>Back</button>
      <div className="profile">
        <div className="left">
          <name>{staticCoachData.firstname}</name>
          <name2>{staticCoachData.lastname}</name2>
          <age>Age: {staticCoachData.age}</age>
          <price>Price: ${staticCoachData.price}</price>
          <gym>Gym: {staticCoachData.gym}</gym>
        </div>

        <div className="middle">
          <div className="location">
            <location>LOCATION</location>
            <town>Town: {staticCoachData.town} </town>
            <state>State: {staticCoachData.state}</state>
          </div>
        </div>

        <div className="right">
          <div className="contact">
            <contact>CONTACT</contact>
            <email>Email: {staticCoachData.email}</email>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;
