import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
// import "../styling/coachprofile.css";
import Coach from "../../visitors/assets/coach.png"
import { Link } from "react-router-dom";
// import "../styling/confirmationmodal.css"
import axios from "axios";
import Cookies from 'js-cookie';

const ClientProfile = () => {
  const API_URL = "http://127.0.0.1:5000";
  const { id } = useParams();
  const [coach, setCoach] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [messageContent, setMessageContent] = useState('');
  const [showMessageForm, setShowMessageForm] = useState(false);
  const clientID = Cookies.get('id')
  const requestData = {
    clientID: clientID,
    coachID: id
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/clients/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCoach(data[0]); 
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageContent,
        }),
      };
      // Send the POST request
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Reset the message content after sending the message
      setMessageContent('');
      // Close the message form
      setShowMessageForm(false);
    } catch (error) {
      setShowMessageForm(false);
      alert("Message did not go through")
      console.error('Error sending message:', error);
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
      <div className="modal-overlay">
        <div className="modal-content">
          <div>Confirm: Send Coach Request
          </div>
          <button onClick={() => onConfirm()}>Yes</button>
          <button onClick={() => onClose()}>No</button>
        </div>
      </div>
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCoachRequest = () => {
    setIsModalOpen(true);
  }

  const handleConfirm = async () => {
    try {
      const response = await axios.post(`${API_URL}/client/sendRequest`, requestData);

      // Handle the response data, if needed
      window.alert(response.data.message)
    } catch (error) {
      window.alert(`An error occurred: ${error.message}`);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="body">
        <ClientNavbar />
        <h1>Client Profile</h1>
        <button onClick={handleGoBack}>Back</button>
        {coach && (
          <div className="profile_2">
            <div className="left">
              <img className="img" src={Coach} alt="coach profile" />
              <name>{coach.firstname} {coach.lastname}</name>
              <age>Age: {coach.age}</age>
              <price>Price: ${coach.price}</price>
              <gym>Gym: {coach.gym}</gym>
            </div>

            <div className="middle">
              <div className="location">
                <town>Town: {coach.town}</town>
                <state>State: {coach.state}</state>
              </div>
            </div>
            
            <div className="info">
              <bio>Description: {coach.bio}</bio>
              <experience>Experience: {coach.experience}</experience>
              <ratings>Ratings: {coach.rating}</ratings>
            </div>

            <div className="right">
              <div className="contact">
                <contact>CONTACT</contact>
                <email>Email: {coach.email}</email>
              </div>
            </div>

            <div className="actions_2">
              <button id="view" onClick={handleOpenMessageForm}>
                Send Message
              </button>
              <button id="view" onClick={handleCoachRequest}>
                  Request Coach
              </button>
              <ConfirmationModal isOpen={isModalOpen} onConfirm={handleConfirm} onClose={handleCancel} />
            </div>

            {/* Message Form Lightbox */}
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
                    ></textarea>

                    <button type="button" onClick={sendMessage}>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientProfile;
