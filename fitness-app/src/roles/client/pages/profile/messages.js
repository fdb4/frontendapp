import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import PropTypes from 'prop-types';
import ClientNavbar from "../../../../components/navbar-visitor/clientnav";
import "../../styling/messages.css";


const API_URL = "http://127.0.0.1:5000";

const Message = ({ sender, content, timestamp, isCurrentUser }) => {
  return (
    <div className={`message ${isCurrentUser ? "sent" : "received"}`}>
      {!isCurrentUser && <p className="sender-name">{sender}</p>}
      <p className="content">{content}</p>
      <p className="timestamp">{new Date(timestamp).toLocaleString()}</p>
    </div>
  );
};

Message.propTypes = {

  sender: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
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

  useEffect(() => {
    if(selectedCoachID) {
      setLoad(true);
      axios.get(`${API_URL}/message/${id}/${selectedCoachID}`)
        .then(response => {
          const formattedMessages = response.data.map(msg => ({
            id: msg.lastmodified,
            content: msg.message,
            timestamp: new Date(msg.lastmodified).getTime(),
            sender: `${msg.SenderFN} ${msg.SenderLN}`,
            senderId: msg.SenderID
          }));
          setMessages(formattedMessages);
        })
        .catch((error) => {
          setError('Failed to load client messages. Please try again later.');
        })
        .finally(() => {
          setLoad(false);
        });  
    }    
  }, [selectedCoachID, id]);

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

  const sendMessage = async (e) => {

    e.preventDefault();
    if(!newMessage.trim()) {

      return;
    }

    const tempTime = new Date();
    try {
      
      const apiUrl = `${API_URL}/message/${selectedCoachID}`;
      const messageData = {
        clientID: id,
        message: newMessage,
      };
      
      const response = await axios.post(apiUrl, messageData);
  
      if (response.status === 200 || response.status === 201) {

        const { lastmodified, SenderFN, SenderLN } = response.data;

        setMessages(prevMessages => [...prevMessages, {
          id: tempTime.toISOString(),
          content: newMessage,
          timestamp: tempTime.toISOString(),
          sender: `${SenderFN}${SenderLN}`,
          senderId: id
        }]);
        setNewMessage('');
      }
      else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } 
    catch (error) {
      console.error('Error sending message:', error);
      alert("Message did not go through")
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
              onClick={() => handleCoachClick(contact.clientID)} 
            />
          ))}
        </div>
        <div className="messages-container">
          <div className="message-area">
            {load ? (
              <p>Select A Contact...</p>
            ) : messages.length === 0 ? (
              <p>No Messages...</p>
            ) : (
              messages.map(message => (
                <Message
                  key={message.id}
                  sender={message.sender}
                  content={message.content}
                  timestamp={message.timestamp}
                  isCurrentUser={message.senderId.toString() === id}
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
