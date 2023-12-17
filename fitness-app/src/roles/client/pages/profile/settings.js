import React, { useState, useEffect } from "react";
import "../../styling/MyProfilePage.css";
import ClientNavbar from "../../../../components/navbar-visitor/clientnav.js";
import "../../styling/settings.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import API_URL from "../../../../components/navbar-visitor/apiConfig.js";

function DeleteConfirmationPopup({ onCancel, onConfirm }) {
  return (
    <div className="delete-confirmation-popup">
      <p>Are you sure you want to delete your account?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
}

function Settings() {
  const [clientInfo, setClientInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const clientId = Cookies.get("id");
  const userRole = Cookies.get("role");

  useEffect(() => {
    fetch(`${API_URL}/genInfo/${clientId}`)
      .then((response) => response.json())
      .then((data) => setClientInfo(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const gender = (binaryGender) => {
    return binaryGender === 0 ? "Male" : "Female";
  };

  const heightConvert = (inches) => {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}' ${remainingInches}"`;
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

  const handleEdit = () => {
    setEditMode(true);
    setEditedInfo({ ...clientInfo[0] });
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedInfo({});
  };

  const handleSave = () => {
    fetch(`${API_URL}/client/edit/${clientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns a success message
        if (data.message === "Profile updated successfully") {
          // Refetch the updated client data
          fetch(`${API_URL}/genInfo/${clientId}`)
            .then((response) => response.json())
            .then((updatedData) => {
              setClientInfo(updatedData);
              setEditMode(false);
            })
            .catch((error) =>
              console.error("Error fetching updated data:", error)
            );
        } else {
          console.error("Error updating data:", data.message);
        }
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const handleChange = (e) => {
    setEditedInfo({
      ...editedInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const navigate = useNavigate();

  const handleDeleteConfirmClient = () => {
    fetch(`${API_URL}/client/delete/${clientId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: clientInfo[0].clientId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Account deleted:", data);
        // Assuming the API returns a success message
        if (data.message === "Client profile deleted successfully") {
          // Delete the client ID from cookies
          Cookies.remove("id");
          // Use the navigate function to redirect to the login page
          navigate("/login");
        } else {
          // Handle other responses, e.g., display an error message
          console.error("Error deleting account:", data.message);
        }
      })
      .catch((error) => console.error("Error deleting account:", error));

    setShowDeleteConfirmation(false);
  };

  const handleDeleteConfirmCoach = () => {
    fetch(`${API_URL}/coach/delete/${clientId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: clientInfo[0].clientId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Account deleted:", data);
        // Assuming the API returns a success message
        if (data.message === "Coach profile deleted successfully") {
          // Delete the client ID from cookies
          Cookies.remove("id");
          // Use the navigate function to redirect to the login page
          navigate("/login");
        } else {
          // Handle other responses, e.g., display an error message
          console.error("Error deleting account:", data.message);
        }
      })
      .catch((error) => console.error("Error deleting account:", error));

    setShowDeleteConfirmation(false);
  };

  return (
    <div className="body_1">
      <ClientNavbar />
      {clientInfo ? (
        <div className="profile_info">
          <img
            className="img"
            src="https://i0.wp.com/www.lizzyc.com.au/journal/wp-content/uploads/2019/07/TGardiner0519_0012.jpg?resize=1024%2C682&ssl=1"
            alt="Profile"
          />
          <div className="editing">
            <h1 className="settings">Settings</h1>
            <p className="paragraph_1">
              Name:{" "}
              {`${clientInfo[0]?.firstname || "N/A"} ${
                clientInfo[0]?.lastname || "N/A"
              }`}
            </p>
            {editMode ? (
              <>
                <label>
                  First Name:
                  <input
                    type="text"
                    name="firstname"
                    value={editedInfo.firstname || ""}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Last Name:
                  <input
                    type="text"
                    name="lastname"
                    value={editedInfo.lastname || ""}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="text"
                    name="email"
                    value={editedInfo.email || ""}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Height:
                  <input
                    type="text"
                    name="height"
                    value={editedInfo.height || ""}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Weight:
                  <input
                    type="text"
                    name="weight"
                    value={editedInfo.weight || ""}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Goal Weight:
                  <input
                    type="text"
                    name="goalweight"
                    value={editedInfo.goalweight || ""}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Movement:
                  <input
                    type="text"
                    name="movement"
                    value={editedInfo.movement || ""}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Age:
                  <input
                    type="text"
                    name="age"
                    value={editedInfo.age || ""}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Gender:
                  <select
                    name="gender"
                    value={editedInfo.gender || ""}
                    onChange={handleChange}
                  >
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                  </select>
                </label>
              </>
            ) : (
              <>
                <p className="paragraph_1">Height: {heightConvert(clientInfo[0].height)}</p>
                <p className="paragraph_1">Weight: {clientInfo[0].weight}</p>
                <p className="paragraph_1">
                  Goal Weight: {clientInfo[0].goalweight}
                </p>
                <p className="paragraph_1">
                  Movement: {getMovement(clientInfo[0].movement)}
                </p>
                <p className="paragraph_1">Age: {clientInfo[0].age}</p>
                <p className="paragraph_1">
                  Gender: {gender(clientInfo[0].gender)}
                </p>
              </>
            )}
            {editMode ? (
              <>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={handleEdit}>Edit</button>
                <button className="delete" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Loading... please wait</p>
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmationPopup
          onCancel={handleDeleteCancel}
          onConfirm={() => {
            if (userRole === "Client") {
              handleDeleteConfirmClient();
            } else {
              handleDeleteConfirmCoach();
            }
          }}
        />
      )}
    </div>
  );
}

export default Settings;
