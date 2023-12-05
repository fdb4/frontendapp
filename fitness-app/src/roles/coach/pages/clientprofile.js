import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import "../styling/clientprofile.css";
import Coach from "../../visitors/assets/coach.png"
import { Link } from "react-router-dom";
// import "../styling/confirmationmodal.css"
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from "axios";
import Cookies from 'js-cookie';

const ClientProfile = () => {
  const API_URL = "http://127.0.0.1:5000";
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [messageContent, setMessageContent] = useState('');
  const [showMessageForm, setShowMessageForm] = useState(false);
  const clientID = Cookies.get('id')
  const requestData = {
    clientID: clientID,
    coachID: id
  }
  const [dailyLog, setDailyLog] = useState([]);

  const mapMood = (value) => {

    const smiles = ["😟", "😕", "😐", "🙂", "😀"]
    return smiles[Math.min(Math.max(Math.round(value), 1), 5) - 1];
  };

  const[calGraphData, setCalGraphData] = useState({

    labels: [],
    datasets: [
      {
        label: 'Weekly Calorie Intake',
        data: [],
        borderColor: 'rgb(167, 80, 62)',
        backgroundColor: 'rgb(255, 255, 255)',
      }
    ],
  });

  const[waterGraphData, setWaterGraphData] = useState({

    labels: [],
    datasets: [
      {
        label: 'Weekly Water Intake',
        data: [],
        borderColor: 'rgb(167, 80, 62)',
        backgroundColor: 'rgb(255, 255, 255)',
      }
    ],
  });

  const [moodGraphData, setMoodGraphData] = useState({

    labels: [],
    datasets: [

      {
        label: 'Weekly Mood',
        data: [],
        borderColor: 'rgb(167, 80, 62)',
        backgroundColor: 'rgb(255, 255, 255)',
      }
    ],
  });

  const moodOptions = {

    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          autoskip: false,
          callback: function(value) {

            return mapMood(value);
          }
        }
      }
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/clients/profile/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setClient(data[0]); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    const fetchDailyLog = async () => {

      axios.get(`${API_URL}/dailyLog-data/${id}`)
      .then((response) => {
        console.log("Response: ", response.data);
        const data = response.data;

        const labels = data.map(entry => new Date(entry.date).toLocaleDateString());
        const calData = data.map(entry => entry.calorie);
        const waterData = data.map(entry => entry.water);
        const moodData = data.map(entry => entry.mood);

        setCalGraphData({
          labels,
          datasets: [{
            label: 'Weekly Calorie Intake',
            data: calData,
            borderColor: 'rgb(167, 80, 62)',
            backgroundColor: 'rgba(255, 255, 255)',
          }]
        });

        setWaterGraphData({
          labels,
          datasets: [{
            label: 'Weekly Water Intake',
            data: waterData,
            borderColor: 'rgb(167, 80, 62)',
            backgroundColor: 'rgba(255, 255, 255)',
          }]
        });

        setMoodGraphData({
          labels,
          datasets: [{
            label: 'Weekly Mood',
            data: moodData,
            borderColor: 'rgb(167, 80, 62)',
            backgroundColor: 'rgba(255, 255, 255)',
          }]
        });
      })
      .catch((error) => {
        if (error.response) {
        
          console.error("Error response:", error.response.data);
        } 
        else if (error.request) {
      
          console.error("No response:", error.request);
        }
        else {
      
          console.error("Error", error.message);
        }
      });
    };

    fetchData();
    fetchDailyLog();
  }, [id]);

  const getGender = (binaryGender) => {
    return binaryGender === 0 ? "Male" : "Female";
  };

  const binConvert = (bin) => {

    return bin === 0 ? "No" : "Yes";
  }

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
  <div className="client-profile-page">
    <ClientNavbar />
    <div className="client-actions">
          <button className="back-button" onClick={handleGoBack}>Back</button>
          <button className="action-button" onClick={handleOpenMessageForm}>Send Message</button>
          <ConfirmationModal isOpen={isModalOpen} onConfirm={handleConfirm} onClose={handleCancel} />
    </div>
    {client && (
      <div className="client-profile-container">
        <div className="client-info-section">
          <div className="client-profile-info">
            <img 
              className="client-img" 
              src="https://i0.wp.com/www.lizzyc.com.au/journal/wp-content/uploads/2019/07/TGardiner0519_0012.jpg?resize=1024%2C682&ssl=1" 
              alt="client profile" 
            />
            <div className="client-details">
              <h2>{client.firstname} {client.lastname}</h2>
              <p>Height: {client.height}</p>
              <p>Weight: {client.weight}</p>
              <p>Goal Weight: {client.goalweight}</p>
              <p>Age: {client.age}</p>
              <p>Gender: {getGender(client.gender)}</p>
            </div>
          </div>
          <div className="client-workout-preferences">
            <h3>Workout Preferences:</h3>
            <p>Cycling: {binConvert(client.cycling)}</p>
            <p>Strength: {binConvert(client.strength)}</p>
            <p>Running: {binConvert(client.running)}</p>
            <p>Sports: {binConvert(client.sports)}</p>
            <p>Yoga: {binConvert(client.yoga)}</p>
            <p>Swimming: {binConvert(client.swimming)}</p>
            <p>Martial Arts: {binConvert(client.martialarts)}</p>
            <p>Other: {client.other}</p>
          </div>
          <div className="contact-info">
            <h3>CONTACT</h3>
            <p>Email: {client.email}</p>
          </div>
        </div>

        <div className="client-logs-section">
          <h3>{client.firstname}'s Daily Logs</h3>
          <div className="graph-container">
            <Line data={calGraphData} />
          </div>
          <div className="graph-container">
            <Line data={waterGraphData} />
          </div>
          <div className="graph-container">
            <Line data={moodGraphData} options={moodOptions} />
          </div>
        </div>


        {showMessageForm && (
          <div className="lightbox">
            <div className="form-container">
              <span className="close" onClick={handleCloseMessageForm}>&times;</span>
              <form>
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                ></textarea>
                <button type="button" onClick={sendMessage}>Send Message</button>
              </form>
            </div>
          </div>
        )}
      </div>
    )}
  </div>
);
};

export default ClientProfile;
