import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import "../styling/coachprofile.css";
import Coach from "../../visitors/assets/coach.png";
import axios from "axios";
import Cookies from "js-cookie";
import API_URL from "../../../components/navbar-visitor/apiConfig";
import MessagePopup from "../../../components/navbar-visitor/MessagePopup";

const CoachProfile = () => {
  const { id } = useParams();
  const [coach, setCoach] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [messageContent, setMessageContent] = useState("");
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showMessageSuccess, setShowMessageSuccess] = useState(false);
  const [showMessageError, setShowMessageError] = useState(false);
  const [showRequestSuccess, setShowRequestSuccess] = useState(false);
  const [showRequestError, setShowRequestError] = useState(false);
  const clientID = Cookies.get("id");
  const requestData = {
    clientID: clientID,
    coachID: id,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/coaches/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCoach(data);
        console.log(data); // Assuming the response is an array with a single coach object
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

  const sendMessage = async () => {
    try {
      // Fetch URL for sending messages (replace with your actual API endpoint)
      // id = the clientID of person recieving the message
      const apiUrl = `${API_URL}/message/${id}`;

      // Fetch options for the POST request
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientID: Cookies.get("id"),
          message: messageContent,
          clientID: clientID,
        }),
      };
      // Send the POST request
      const response = await fetch(apiUrl, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Reset the message content after sending the message
      setMessageContent("");
      // Close the message form
      setShowMessageForm(false);
      setShowMessageSuccess(true);
    } catch (error) {
      setShowMessageForm(false);
      setShowMessageError(false);
      console.error("Error sending message:", error);
    }
  };

  const handleOpenMessageForm = () => {
    // Open the message form
    setShowMessageForm(true);
  };

  const handleCloseMessageForm = () => {
    // Close the message form
    setShowMessageForm(false);
  };

  function ConfirmationModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) {
      return null;
    }

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <div>Confirm: Send Coach Request</div>
          <button style={styles.modalButton} onClick={() => onConfirm()}>
            Yes
          </button>
          <button style={styles.modalButton} onClick={() => onClose()}>
            No
          </button>
        </div>
      </div>
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCoachRequest = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/client/sendRequest`,
        requestData
      );

      // Handle the response data, if needed
      setIsModalOpen(false);
      setShowRequestSuccess(true);
    } catch (error) {
      setIsModalOpen(false);
      setShowRequestSuccess(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="body">
        <ClientNavbar />
        <h1>Coach Profile</h1>
        <div className="back-button">
          <button className="coach-profile-button" onClick={handleGoBack}>Back</button>
        </div>
        {coach && (
          <div className="profile">
            <img
              className="profile-img"
              src={Coach}
              alt="coach profile"
            />
            <div className="profile-info">
              <h2>
                {coach.firstname} {coach.lastname}
              </h2>
              <p className="info" style = {{ color: 'black', fontSize: '24px' }}>
                <strong>Price:</strong> ${coach.price}
              </p>
              <p className="info" style = {{ color: 'black', fontSize: '24px' }}>
                <strong>Gym:</strong> {coach.gym}
              </p>
            </div>
            <div className="profile-info">
              <div className="location">
                <p className="info" style = {{ color: 'black', fontSize: '24px' }}>
                  <strong>Town:</strong> {coach.town}
                </p>
                <p className="info" style = {{ color: 'black', fontSize: '24px' }}>
                  <strong>State:</strong> {coach.state}
                </p>
              </div>
              <div className="experience">
                <p className="info" style = {{ color: 'black', fontSize: '24px' }}>
                  <strong>Experience:</strong> {coach.experience}
                </p>
                <p className="info" style = {{ color: 'black', fontSize: '24px' }}>
                  <strong>Ratings:</strong> {coach.rating}
                </p>
              </div>
            </div>
            <div className="description">
              <p style = {{ color: 'black', fontSize: '24px' }}>
                <strong>Description:</strong> {coach.bio}
              </p>
            </div>

            <div className="contact">
              <h2>Contact</h2>
              <p className="info" style = {{ color: 'black', fontSize: '24px' }}>
                <strong>Email:</strong> {coach.email}
              </p>
            </div>
            <div className="buttons">
              <button
                id="message-button"
                onClick={handleOpenMessageForm}
              >
                Send Message
              </button>
              <button id="request-button" onClick={handleCoachRequest}>
                Request Coach
              </button>
            </div>
            <ConfirmationModal
              isOpen={isModalOpen}
              onConfirm={handleConfirm}
              onClose={handleCancel}
            />
            {showRequestSuccess && (
              <MessagePopup message="Request Sent Successfully!" />
            )}
            {showRequestError && (
              <MessagePopup message="Request Failed to Send!" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modalContent: {
    backgroundColor: "rgb(11, 0, 0)",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    color: "white",
  },

  modalButton: {
    margin: "8px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
  },

  modalButtonHover: {
    backgroundColor: "#0056b3",
  }
};

export default CoachProfile;
