import ClientNavbar from "../../../../components/navbar-visitor/clientnav.js";
import React, { useState, useEffect } from "react";
import "../../styling/MyProfilePage.css";
import Cookies from "js-cookie";
import { FlareSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MyProfilePage = () => {
  const [clientInfo, setClientInfo] = useState(null);
  const [error, setError] = useState(null);
  const [coachInfo, setCoachInfo] = useState("");
  const APIURL = "http://127.0.0.1:5000";
  const [alreadyCoach, setAlreadyCoach] = useState(false);
  const [coachRequest, setCoachRequest] = useState(false);
  const navigate = useNavigate();
  const clientId = Cookies.get("id");

  useEffect(() => {
    fetch(`${APIURL}/genInfo/${clientId}`)
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

    //See If Client Already Has a Coach
    fetch(`${APIURL}/clients/coach/${clientId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        // If No Coach, Check If They Have a Request Sent Out
        if (data.clientID === null) {
          fetch(`${APIURL}/client/requests/${clientId}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to fetch data");
              }
              return response.json();
            })
            .then((data) => {
              // If No Requests Out Either
              if (data.clientID === null) {
                setCoachInfo("None");
              } else {
                setCoachInfo(data);
                setCoachRequest(true);
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              setError(error.message);
            });
        } else {
          setCoachInfo(data);
          setAlreadyCoach(true);
        }
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, []);

  console.log(coachInfo);
  console.log(alreadyCoach);
  console.log(coachRequest);

  const gender = (binaryGender) => {
    return binaryGender === 0 ? "Male" : "Female";
  };

  const heightConvert = (inches) => {
    const feet = Math.floor(inches / 12);
    const remainder = inches % 12;
    return `${feet}' ${remainder}`;
  };

  function getMovement(movement) {
    switch (movement) {
      case "sedentary":
        return "Sedentary";
      case "lightly":
        return "Lightly Active";
      case "moderate":
        return "Moderately Active";
      case "very":
        return "Very Active";
      default:
        return movement || "N/A";
    }
  }

  function DisplayCoach() {
    if (alreadyCoach) {
      return (
        <div style={{ flexDirection: "column" }}>
          <p style={{ color: "black" }}>
            {coachInfo.firstname} {coachInfo.lastname}
          </p>
          <button onClick={handleViewCoach}>View Profile</button>
          {isModalOpen && <CoachInformationModal onClose={handleCloseModal} />}
        </div>
      );
    }
    if (coachRequest) {
      return (
        <div style={{ flexDirection: "column" }}>
          <p style={{ color: "black" }}>
            {coachInfo.firstname} {coachInfo.lastname}
          </p>
          <button onClick={handleViewCoach}>View Profile</button>
          {isModalOpen && <CoachInformationModal onClose={handleCloseModal} />}
        </div>
      );
    }
    return (
      <div style={{ flexDirection: "column" }}>
        <p style={{ color: "black" }}>None</p>
        <button onClick={() => navigate("/clientcoaches")}>Find Coach</button>
      </div>
    );
  }

  const CoachInformationModal = ({ onClose }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              border: "none",
              background: "none",
              color: "black",
            }}
          >
            X
          </button>
          <p style={{ color: "black" }}>Email: {coachInfo.email}</p>
          <p style={{ color: "black" }}>
            Name: {coachInfo.firstname} {coachInfo.lastname}
          </p>
          <p style={{ color: "black" }}>Price: ${coachInfo.price}</p>
          <p style={{ color: "black" }}>Rating: {coachInfo.rating}</p>
          <p style={{ color: "black" }}>Gym: {coachInfo.gym}</p>
          <p style={{ color: "black" }}>Town: {coachInfo.town}</p>
          <p style={{ color: "black" }}>State: {coachInfo.state}</p>
          {alreadyCoach ? (
            <button>Fire Coach</button>
          ) : (
            <button onClick={handleUnsendRequest}>Unsend Request</button>
          )}
        </div>
      </div>
    );
  };

  const handleUnsendRequest = async () => {
    try {
      const coachID = coachInfo.clientID;
      const response = await fetch(`${APIURL}/client/unsendRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coachID: coachID,
          clientID: clientId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to unsend request");
      }

      console.log("Request successfully unsent");
      alert("Success");
    } catch (error) {
      console.error("Error unsending request:", error.message);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleViewCoach = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <div className="profile-page">
      <ClientNavbar />
      {error ? (
        <div>
          <p>Error: {error}</p>
        </div>
      ) : clientInfo ? (
        <div className="profile_info">
          <img
            className="img"
            src="https://i0.wp.com/www.lizzyc.com.au/journal/wp-content/uploads/2019/07/TGardiner0519_0012.jpg?resize=1024%2C682&ssl=1"
            alt="Profile"
          />
          <div className="right-myprofile">
            <div>
              <p1 style={{ color: "black" }}>Your Coach:</p1>
              <DisplayCoach />
            </div>
            <h1 className="client-name">
              {clientInfo[0]
                ? `${clientInfo[0].firstname} ${clientInfo[0].lastname}`
                : "Client's"}{" "}
            </h1>
          </div>
          <div className="right-myprofile-info">
            <p>Email: {clientInfo[0] ? clientInfo[0].email : "N/A"}</p>
            <p>
              Height:{" "}
              {clientInfo[0] ? heightConvert(clientInfo[0].height) : "N/A"}
            </p>
            <p>Weight: {clientInfo[0] ? clientInfo[0].weight : "N/A"}</p>
            <p>
              Goal Weight: {clientInfo[0] ? clientInfo[0].goalweight : "N/A"}
            </p>
            <p>
              Movement Type:{" "}
              {clientInfo[0] ? getMovement(clientInfo[0].movement) : "N/A"}
            </p>
            <p>Age: {clientInfo[0] ? clientInfo[0].age : "N/A"}</p>
            <p>
              Gender: {clientInfo[0] ? gender(clientInfo[0].gender) : "N/A"}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading... please wait</p>
      )}
    </div>
  );
};

export default MyProfilePage;
