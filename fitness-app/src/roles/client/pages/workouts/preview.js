// Preview.jsx

import React, { useEffect, useState } from 'react';
import ClientNavbar from '../../../../components/navbar-visitor/clientnav';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import API_URL from '../../../../components/navbar-visitor/apiConfig.js';
import './styling/preview.css'; // Import the external stylesheet

function Preview() {
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'today', 'yesterday', 'last7', 'last14', 'last30'
  const clientId = Cookies.get('id');
  const navigate = useNavigate();

  useEffect(() => {

    fetch(`${API_URL}/workoutlogs/client/${clientId}`)
      .then(response => response.json())
      .then(data => {
<<<<<<< HEAD
        // Check if data is an object, and convert it to an array if needed
        let logsArray = [];
        if (Array.isArray(data)) {
          logsArray = data;
        } 
        else if (typeof data === 'object' && data !== null) {
          logsArray = Object.values(data).flat();
        }
  
        // Group workout logs by workoutplanID
        const groupedWorkoutLogs = groupByPlanName(logsArray);
=======

        const logsArray = Array.isArray(data) ? data : [data]; // Wrap the object in an array

        const groupedWorkoutLogs = groupByWorkoutPlanID(logsArray);
>>>>>>> f5e3785c3b6135adbeae623b755c9f84218c83a6
        setWorkoutLogs(groupedWorkoutLogs);
      })
      .catch(error => console.error('Error fetching workout logs:', error));
  }, [clientId]);


  // Function to group workout logs by workoutplanID
  const groupByWorkoutPlanID = logs => {
    const groupedLogs = {};

    logs.forEach(log => {
      const { workoutplanID } = log;

      if (!groupedLogs[workoutplanID]) {
        groupedLogs[workoutplanID] = [];
      }

      groupedLogs[workoutplanID].push(log);
    });

    return groupedLogs;
  };

<<<<<<< HEAD
  const groupByPlanName = logs => {
  if (!Array.isArray(logs)) {
    console.error('Invalid logs format:', logs); // Error log for invalid format
    return {};
  }

  const groupedLogs = {};

  logs.forEach(log => {
    const groupName = log.planName || 'Unnamed Plan';

    if (!groupedLogs[groupName]) {
      groupedLogs[groupName] = [];
    }

    groupedLogs[groupName].push(log);
  });

  return groupedLogs;
};

  // Function to sort logs based on sortOrder
// Function to sort logs based on sortOrder
=======
>>>>>>> f5e3785c3b6135adbeae623b755c9f84218c83a6
    const sortLogs = (logs, order) => {
    // Convert the object of logs back to an array
    const logsArray = Object.values(logs);

    return logsArray.sort((a, b) => {
        const workoutIDA = a.length > 0 ? a[0].workoutID : 0;
        const workoutIDB = b.length > 0 ? b[0].workoutID : 0;

        return order === 'asc' ? workoutIDA - workoutIDB : workoutIDB - workoutIDA;
    });
    };


  // Function to filter logs based on timeFilter
  const filterLogsByTime = (logs, filter) => {
    const currentDate = new Date();
  
    switch (filter) {
      case 'today':
        return logs.filter(log => isSameDay(new Date(log.lastmodified), currentDate));
      case 'yesterday':
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - 1);
        return logs.filter(log => isSameDay(new Date(log.lastmodified), yesterday));
      case 'last7':
        const last7Days = new Date(currentDate);
        last7Days.setDate(currentDate.getDate() - 7);
        return logs.filter(log => new Date(log.lastmodified) >= last7Days);
      case 'last14':
        const last14Days = new Date(currentDate);
        last14Days.setDate(currentDate.getDate() - 14);
        return logs.filter(log => new Date(log.lastmodified) >= last14Days);
      case 'last30':
        const last30Days = new Date(currentDate);
        last30Days.setDate(currentDate.getDate() - 30);
        return logs.filter(log => new Date(log.lastmodified) >= last30Days);
      default:
        return logs;
    }
  };
  
  
  // Function to check if two dates are the same day
  const isSameDay = (date1, date2) => {
    console.log("Date 1:", date1);
    console.log("Date 2:", date2);
  
    return (
      date1.getUTCFullYear() === date2.getUTCFullYear() &&
      date1.getUTCMonth() === date2.getUTCMonth() &&
      date1.getUTCDate() === date2.getUTCDate()
    );
  };
  const handleSortChange = e => {
    setSortOrder(e.target.value);
  };

  const handleTimeFilterChange = e => {
    setTimeFilter(e.target.value);
  };

  const handleGoBack = () => {
    navigate('/workouts');
  };

  // Apply sorting and filtering based on user selections
  const filteredLogs = filterLogsByTime(sortLogs(groupByPlanName(workoutLogs), sortOrder), timeFilter);

  return (
    <div className="body">
      <ClientNavbar />
      <button className="button" onClick={handleGoBack}>
        Back
      </button>

      {/* Filter controls */}
      <div className="filter-controls">
        <label>
          Sort Order:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <label>
          Time Filter:
          <select value={timeFilter} onChange={handleTimeFilterChange}>
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7">Last 7 days</option>
            <option value="last14">Last 14 days</option>
            <option value="last30">Last 30 days</option>
          </select>
        </label>
      </div>

      {/* Display filtered workout logs */}
      {Object.keys(filteredLogs).map(planName => (
        <div key={planName} className="workout-plan-container">
          <h3 className="workout-plan-header">Workout Plan: {planName}</h3>
          <ul className="workout-log-list">
            {filteredLogs[planName].map(log => (
              <li key={log.workoutID} className="workout-log-item">
                <p>Workout ID: {log.workoutID}</p>
                <p>Sets: {log.sets}</p>
                <p>Reps: {log.reps}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Preview;
