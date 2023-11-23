import React, { useState, useEffect } from "react";
import "../../styling/MyProfilePage.css";
import ClientNavbar from "../../../../components/navbar-visitor/clientnav.js";
import "../../styling/settings.css"


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

  useEffect(() => {
    const clientId = "1";

    fetch(`http://127.0.0.1:5000/genInfo/${clientId}`)
      .then((response) => response.json())
      .then((data) => setClientInfo(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const gender = (binaryGender) => {
    return binaryGender === 0 ? "Male" : "Female";
  };

  const handleEdit = () => {
    setEditMode(true);
    // Copy the clientInfo to editedInfo for editing
    setEditedInfo({ ...clientInfo[0] });
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset editedInfo to the original clientInfo
    setEditedInfo({});
  };

  const handleSave = () => {
    // Send a post request to save the editedInfo to the backend
    fetch(`http://127.0.0.1:5000/updateInfo/${clientInfo[0].clientId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        setClientInfo(data);
        setEditMode(false);
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const handleChange = (e) => {
    // Update the editedInfo when the user makes changes
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

  const handleDeleteConfirm = () => {
    // Send a post request to mark the account for deletion
    fetch(`http://127.0.0.1:5000/deleteAccount/${clientInfo[0].clientId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: clientInfo[0].clientId }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success (e.g., navigate to login page)
        console.log("Account marked for deletion:", data);
      })
      .catch((error) => console.error("Error deleting account:", error));

    // Close the delete confirmation popup
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="body_1">
      <ClientNavbar />
      {clientInfo ? (
        <div className="profile_info">
          <img
            className="profile_img"
            src="https://i0.wp.com/www.lizzyc.com.au/journal/wp-content/uploads/2019/07/TGardiner0519_0012.jpg?resize=1024%2C682&ssl=1"
            alt="Profile"
          />
          <div className="right">
            <h1>Settings</h1>
            <p>{`${clientInfo[0].firstname} ${clientInfo[0].lastname}'s`}</p>
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
                <p>Height: {clientInfo[0].height}</p>
                <p>Weight: {clientInfo[0].weight}</p>
                <p>Goal Weight: {clientInfo[0].goalweight}</p>
                <p>Movement: {clientInfo[0].movement}</p>
                <p>Age: {clientInfo[0].age}</p>
                <p>Gender: {gender(clientInfo[0].gender)}</p>
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
                <button className="delete" onClick={handleDelete}>Delete</button>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Loading... please wait</p>
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmationPopup
          className="cancel" onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}

export default Settings;
