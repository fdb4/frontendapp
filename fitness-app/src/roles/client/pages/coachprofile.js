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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "fixed",
            top: 107,
            left: 20,
          }}
        >
          <button onClick={handleGoBack}>Back</button>
        </div>
        {coach && (
          <div className="profile_2">
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
            <div style={{ color: "black" }}>Description: {coach.bio}</div>

            <div className="right">
              <div className="contact">
                <contact>CONTACT</contact>
                <email>Email: {coach.email}</email>
              </div>
              <button
                id="view"
                onClick={handleOpenMessageForm}
                style={{ marginRight: "10px" }}
              >
                Send Message
              </button>
              <button id="view" onClick={handleCoachRequest}>
                Request Coach
              </button>
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
            {showMessageForm && (
              <div className="lightbox">
                <div className="form-container">
                  <span className="close" onClick={handleCloseMessageForm}>
                    &times;
                  </span>
                  <form>
                    <label htmlFor="message">Message:</label>
                    <textarea
                      id="message"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      style={{ color: "black" }}
                    ></textarea>
                    <button type="button" onClick={sendMessage}>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}
            {showMessageSuccess && (
              <MessagePopup message="Message Sent Successfully!" />
            )}
            {showMessageError && (
              <MessagePopup message="Message Failed to Send!" />
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
    color: "rgb(246, 245, 245)",
  },

  modalButton: {
    margin: "8px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
  },

  modalButtonHover: {
    backgroundColor: "#555",
  },
};

export default CoachProfile;
