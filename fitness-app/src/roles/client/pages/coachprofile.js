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
      <div className="coach-profile-body">
        <ClientNavbar />
        <h1 style = {{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>Coach Profile</h1>
        <div className="coach-profile-back-button">
          <button className="coach-profile-button" onClick={handleGoBack}>Back</button>
        </div>
        {coach && (
          <div className="coach-profile-container">
            <img
              className="coach-profile-img"
              src={Coach}
              alt="coach profile"
            />
            <div className="coach-profile-info">
              <h2 style = {{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                {coach.firstname} {coach.lastname}
              </h2>
              <p className="coach-profile-info-text"style = {{ color: 'black', fontSize: '24px', fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                <strong>Price:</strong> ${coach.price}
              </p>
              <p className="coach-profile-info-text" style = {{ color: 'black', fontSize: '24px', fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                <strong>Gym:</strong> {coach.gym}
              </p>
            </div>
            <div className="coach-profile-additional-info">
              <div className="coach-profile-location">
                <p className="coach-profile-info-text" style = {{ color: 'black', fontSize: '24px', fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                  <strong>Town:</strong> {coach.town}
                </p>
                <p className="coach-profile-info-text" style = {{ color: 'black', fontSize: '24px', fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                  <strong>State:</strong> {coach.state}
                </p>
              </div>
              <div className="coach-profile-experience">
                <p className="coach-profile-info-text" style = {{ color: 'black', fontSize: '24px', fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                  <strong>Experience:</strong> {coach.experience}
                </p>
                <p className="coach-profile-info-text" style = {{ color: 'black', fontSize: '24px', fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                  <strong>Ratings:</strong> {coach.rating}
                </p>
              </div>
            </div>
            <div className="coach-profile-description">
              <p style = {{ color: 'black', fontSize: '24px', fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                <strong>Description:</strong> {coach.bio}
              </p>
            </div>
            <div className="coach-profile-contact">
              <h2 style = {{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>Contact</h2>
              <p className="coach-profile-info-text" style = {{ color: 'black', fontSize: '24px', fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                <strong>Email:</strong> {coach.email}
              </p>
            </div>
            <div className="coach-profile-buttons">
              <button
                id="coach-profile-message-button"
                onClick={handleOpenMessageForm}
              >
                Send Message
              </button>
              <button id="coach-profile-request-button" onClick={handleCoachRequest}>
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
        {showMessageForm && (
        <div className="coach-profile-lightbox">
          <div className="coach-profile-form-container">
            <span className="coach-profile-close" style={{ color: 'white' }} onClick={handleCloseMessageForm}>
              &times;
            </span>
            <form>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                style={{ color: "black", fontFamily: 'Copperplate, Papyrus, fantasy'}}
              ></textarea>
              <button type="button" onClick={sendMessage}>
                Send Message
              </button>
            </form>
          </div>
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
