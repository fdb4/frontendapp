import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import "../styling/coachprofile.css";

import { Link } from "react-router-dom";

const CoachProfile = () => {
  const { id } = useParams();
  const [coach, setCoach] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [messageContent, setMessageContent] = useState('');
  const [showMessageForm, setShowMessageForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/coaches/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCoach(data[0]); // Assuming the response is an array with a single coach object
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
      const apiUrl = 'http://your-api-endpoint/messages';
  
      // Fetch options for the POST request
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coachId: id, // Coach's ID from the URL
          clientId: 2,
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

  return (
    <div>
      <div className="body_1">
        <ClientNavbar />
        <h1>Coach Profile</h1>
        <button onClick={handleGoBack}>Back</button>
        {coach && (
          <div className="profile_2">
            <div className="left">
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
              <button id="view">
                <Link to={`/messages`} className="view">
                  Request Client
                </Link>
              </button>
            </div>

            {/* Message Form Lightbox */}
            {showMessageForm && (
              <div className="lightbox">
                <div className="form-container">
                  <span className="close" onClick={handleCloseMessageForm}>
                    &times;
                  </span>
                  <form>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" /* Add name state and value here */ />

                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" /* Add title state and value here */ />

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

export default CoachProfile;
