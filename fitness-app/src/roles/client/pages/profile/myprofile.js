import ClientNavbar from "../../../../components/navbar-visitor/clientnav.js";
import React, { useState, useEffect } from "react";
import "../../styling/MyProfilePage.css";
import Cookies from "js-cookie";

const MyProfilePage = () => {
  const [clientInfo, setClientInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const clientId = Cookies.get("id");
    fetch(`http://127.0.0.1:5000/genInfo/${clientId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setClientInfo(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, []);

  const gender = (binaryGender) => {
    return binaryGender === 0 ? "Male" : "Female";
  };

  return (
    <div className="body_1">
      <ClientNavbar />
      {error ? (
        <div>
          <p>Error: {error}</p>
        </div>
      ) : clientInfo ? (
        <div className="profile_info">
          {/* {clientInfo[0] && clientInfo[0].firstname && (
            // <img
            //   className="profile_img"
            //   src="https://i0.wp.com/www.lizzyc.com.au/journal/wp-content/uploads/2019/07/TGardiner0519_0012.jpg?resize=1024%2C682&ssl=1"
            //   alt="Profile"
            // />
          )} */}
            <img
              className="profile_img"
              src="https://i0.wp.com/www.lizzyc.com.au/journal/wp-content/uploads/2019/07/TGardiner0519_0012.jpg?resize=1024%2C682&ssl=1"
              alt="Profile"
            />
          <div className="right">
            <h1>{clientInfo[0] ? `${clientInfo[0].firstname} ${clientInfo[0].lastname}'s` : "Client's"} </h1>
            <p>Email: {clientInfo[0] ? clientInfo[0].email : "N/A"}</p>
            <p>Height: {clientInfo[0] ? clientInfo[0].height : "N/A"}</p>
            <p>Weight: {clientInfo[0] ? clientInfo[0].weight : "N/A"}</p>
            <p>Goal Weight: {clientInfo[0] ? clientInfo[0].goalweight : "N/A"}</p>
            <p>Movement: {clientInfo[0] ? clientInfo[0].movement : "N/A"}</p>
            <p>Age: {clientInfo[0] ? clientInfo[0].age : "N/A"}</p>
            <p>Gender: {clientInfo[0] ? gender(clientInfo[0].gender) : "N/A"}</p>
          </div>
        </div>
      ) : (
        <p>Loading... please wait</p>
      )}
    </div>
  );
};

export default MyProfilePage;
