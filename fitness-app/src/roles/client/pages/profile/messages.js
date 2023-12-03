import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import ClientNavbar from "../../../../components/navbar-visitor/clientnav";
import "./messages.css";


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

const Contact = ({ cID, name, onClick }) => {

  return <p onClick={() => onClick(cID)} style ={{ cursor: 'pointer' }}>{name}</p>;
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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if(!newMessage.trim()) {

      return;
    }

    axios.post(`${API_URL}/message/${id}`, {

      content: newMessage,
    })
    .then(response => {
      setMessages([...messages, response.data.newMessage]);
      setNewMessage('');
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
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
              key={contact.id} 
              cID={contact.id}
              name={contact.name} 
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
        <form onSubmit={handleSendMessage} className="message-form">
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

  );
};

export default ClientMessages;
