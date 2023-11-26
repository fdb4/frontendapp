import ClientNavbar from "../../../../components/navbar-visitor/clientnav.js";
import React, { useState, useEffect } from "react";
import "../../styling/MyProfilePage.css"
import Cookies from "js-cookie";

const MyProfilePage = () => {
  const [clientInfo, setClientInfo] = useState(null);

  useEffect(() => {
    const clientId = Cookies.get('id');
    fetch(`http://127.0.0.1:5000/genInfo/${clientId}`)
      .then((response) => response.json())
      .then((data) => setClientInfo(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  

  const gender = (binaryGender) => {
    return binaryGender === 0 ? "Male" : "Female";
  };

  return (
    <div className="body_1">
      <ClientNavbar />
      {clientInfo ? (
        <div className="profile_info">
          {/* {clientInfo[0].profileImage && (
            <img
              src={clientInfo[0].profileImage}
              alt="Profile"
              style={{
                maxWidth: "100px",
                borderRadius: "50%",
                marginTop: "10px",
              }}
            />
          )} */}
          <img className="profile_img" src="https://i0.wp.com/www.lizzyc.com.au/journal/wp-content/uploads/2019/07/TGardiner0519_0012.jpg?resize=1024%2C682&ssl=1"></img>
          <div className="right">
          <h1>{`${clientInfo[0].firstname} ${clientInfo[0].lastname}'s`}</h1>  
          <p>Email: {clientInfo[0].email}</p>
          <p>Height: {clientInfo[0].height}</p>
          <p>Weight: {clientInfo[0].weight}</p>
          <p>Goal Weight: {clientInfo[0].goalweight}</p>
          <p>Movement: {clientInfo[0].movement}</p>
          <p>Age: {clientInfo[0].age}</p>
          <p>Gender: {gender(clientInfo[0].gender)}</p>
          </div>
        </div>
      ) : (
        <p>Loading... please wait</p>
      )}
    </div>
  );
};

export default MyProfilePage;
