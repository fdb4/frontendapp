import React, { useState, useEffect } from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import "../styling/coachclient.css";
import { Link } from "react-router-dom";
import Coach from "../../visitors/assets/coach.png";
import Cookies from "js-cookie";

function ClientProfiles() {
  const [clients, setClients] = useState([]);
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    value: "",
  });
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    fetchData();
    fetchRequests();
  }, [filters, searchTerm]);

  const clientId = Cookies.get("id");

  const fetchData = async () => {
    try {
      setLoadingClients(true);
      let url = `http://127.0.0.1:5000/coaches/clients/${clientId}`;
      const response = await fetch(url);
      const data = await response.json();

      const filteredClients = data.filter(
        (client) =>
          client.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setClients(filteredClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      // Display a user-friendly error message
    } finally {
      setLoadingClients(false);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoadingRequests(true);
      let requestUrl = `http://127.0.0.1:5000/coaches/requests/${clientId}`;
      const response = await fetch(requestUrl);
      const requestJson = await response.json();
      setRequests(requestJson);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleRequestDecision = async (requestId, decision) => {
    try {
      const requestUrl = `http://127.0.0.1:5000/coaches/requests`;
      const payload = {
        coachID: clientId,
        clientID: requestId,
        decision: decision,
      };
  
      await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      // Refresh the requests after a successful decision
      fetchRequests();
  
      // Check if the decision is to accept and there are no more requests
      if (decision === 1 && requests.length === 1) {
        // Reload the page after accepting the last client
        window.location.reload();
      }
    } catch (error) {
      console.error("Error handling request:", error);
      // Display a user-friendly error message
    }
  };

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(clients.length / clientsPerPage);

  const handleFilterChange = (selectedFilter) => {
    setFilters({
      type: selectedFilter,
      value: "",
    });
  };

  const handleFilter = () => {
    fetchData();
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilters({
      type: "",
      value: "",
    });
  };

  return (
    <div className="body_1">
      <ClientNavbar />
      <h1>CLIENTS</h1>

      <div className="body_1">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="" disabled>
              Filter by:
            </option>
          </select>
          <button onClick={handleFilter}>Filter</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>

      {loadingRequests ? (
        <p>Loading Requests...</p>
      ) : requests.length > 0 ? (
        <div className="requesting">
          <h2>Client Requests</h2>
          {requests.map((request) => (
            <div key={request.clientID} className="request">
              <div className="request-info">
                <p>
                  <strong>Name:</strong>{" "}
                  {`${request.firstname} ${request.lastname}`}
                </p>
                {/* Add other request information fields as needed */}
              </div>
              <div className="request-actions">
                <button
                  onClick={() => handleRequestDecision(request.clientID, 1)}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRequestDecision(request.clientID, 0)}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="requesting">No client requests found.</p>
      )}

      {loadingClients ? (
        <p>Loading Clients...</p>
      ) : (
        <>
          {currentClients.map((client) => (
            <div key={client.email} className="profile">
              <div className="left">
                <name>
                  {client.firstname} {client.lastname}
                </name>
                <age>Age: {client.age}</age>
              </div>

              <div className="middle">
                <div className="location">
                </div>
                <div className="middle_2">
                  <movement>Movement: {client.movement}</movement>
                </div>
              </div>

              <div className="right">
                <div className="contact">
                  <contact>CONTACT</contact>
                  <email>Email: {client.email}</email>
                </div>
                <Link to={`/clients/${client.clientID}`} className="view">
                  VIEW PROFILE
                </Link>
              </div>
            </div>
          ))}
        </>
      )}

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page
          <input
            type="number"
            value={currentPage}
            onChange={(e) => setCurrentPage(e.target.value)}
            onBlur={() => paginate(parseInt(currentPage))}
            min="1"
            max={totalPages}
          />
          of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ClientProfiles;
