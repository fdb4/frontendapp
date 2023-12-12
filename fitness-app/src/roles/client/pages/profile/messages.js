import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import PropTypes from 'prop-types';
import ClientNavbar from "../../../../components/navbar-visitor/clientnav";
import "../../styling/messages.css";


const API_URL = "http://127.0.0.1:5000";

const Message = ({ sender, content, timestamp }) => {
  return (
    <div className="message">
      <p className="sender">{sender}</p>
      <p className="content">{content}</p>
      <p className="timestamp">{new Date(timestamp).toLocaleString()}</p>
    </div>
  );
};

Message.propTypes = {

  sender: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
}

const Contact = ({ cID, firstname, lastname, onClick }) => {

  return (
    <p onClick={() => onClick(cID)} style ={{ cursor: 'pointer' }}>
      {firstname} {lastname}
    </p>
  );
};

Contact.propTypes = {
  cID: PropTypes.number.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const ClientMessages = () => {

  const id = Cookies.get("id");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedCoachID, setSelectedCoachID] = useState(null);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [showMessageForm, setShowMessageForm] = useState(false);

  useEffect(() => {
    if(selectedCoachID) {

      axios.get(`${API_URL}/message/${selectedCoachID}`)
        .then(response => {
          setMessages(response.data);
          setLoad(false);
        })
        .catch((error) => {
          setError('Failed to load client messages. Please try again later.');
          setLoad(false);
        });  
    }    
  }, [selectedCoachID]);

  useEffect(() => {

    axios.get(`${API_URL}/message/conversations/${id}`)
      .then(response => {
        setContacts(response.data);
      }) 
      .catch(error => {
        console.error('Error fetching list of contacts', error)
      }); 
  }, [id]);

  const handleCoachClick = (coachId) => {

    setSelectedCoachID(coachId);
  };

  const sendMessage = async () => {
    try {
      const apiUrl = `${API_URL}/message/${id}`;
  
      // Fetch options for the POST request
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientID: Cookies.get('id'),
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

  return (
    <div className="messages">
      <ClientNavbar />
      {error && <p className="error-message">Error: {error}</p>}
      <div className="content-area">
        <div className="contacts-list">
          <h3>Message Contacts</h3>
          {contacts.map(contact => (
            <Contact 
              key={contact.clientID} 
              cID={contact.clientID}
              firstname={contact.firstname} 
              lastname={contact.lastname}
              onClick={handleCoachClick} 
            />
          ))}
        </div>
        <div className="messages-container">
          <div className="message-area">
            {load ? (
              <p>Loading Messages...</p>
            ) : messages.length === 0 ? (
              <p>No Messages...</p>
            ) : (
              messages.map(message => (
                <Message
                  key={message.id}
                  sender={message.sender}
                  content={message.content}
                  timestamp={message.timestamp}
                />
            ))
          )}
        </div>
        <div className= "submit-button">
          <form onSubmit={sendMessage} className="message-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              className="message-input"
            />
            <button type="submit" className="send-button">Send</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  );
};

export default ClientMessages;
