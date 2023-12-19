import React, { useState, useEffect } from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import "../styling/coachclient.css";
import { Link, useNavigate } from "react-router-dom";
import Coach from "../../visitors/assets/coach.png";
import Cookies from "js-cookie";
import API_URL from "../../../components/navbar-visitor/apiConfig";

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

  const nav = useNavigate();

  const clientId = Cookies.get("id");

  const fetchData = async () => {
    try {
      setLoadingClients(true);
      let url = `${API_URL}/coaches/clients/${clientId}`;
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
      let requestUrl = `${API_URL}/coaches/requests/${clientId}`;
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
      const requestUrl = `${API_URL}/coaches/requests`;
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

  const handleClientSelect = (clientID) => {
    Cookies.set("currentClientID", clientID);
    nav(`/clients/${clientID}`);
  };

  return (
    <div className="cp-body_1">
      <ClientNavbar />
      <h1 style = {{ fontFamily: 'Copperplate, Papyrus, fantasy', color: 'white' }}>CLIENTS</h1>
      <div className="cp-search-section">
        <div className="cp-search-container">
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
        <div className="cp-requesting">
          <h2 className="client-request-title" style = {{ fontFamily: 'Copperplate, Papyrus, fantasy', color: 'white' }}>Client Requests</h2>
          {requests.map((request) => (
            <div key={request.clientID} className="cp-request">
              <div className="cp-request-info">
                <p style = {{ color: 'black', fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                  <strong>Name:</strong>{" "}
                  {`${request.firstname} ${request.lastname}`}{" "}
                </p>
              </div>
              <div className="cp-request-actions">
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
        <p className="cp-requesting" style = {{ color: 'white', fontFamily: 'Copperplate, Papyrus, fantasy' }}>No client requests found.</p>
      )}

      {loadingClients ? (
        <p>Loading Clients...</p>
      ) : (
        <>
          {currentClients.map((client) => (
            <div key={client.email} className="cp-profile">
              <div className="cp-left">
                <img
                  className="cp-client-img"
                  src="https://i0.wp.com/www.lizzyc.com.au/journal/wp-content/uploads/2019/07/TGardiner0519_0012.jpg?resize=1024%2C682&ssl=1"
                  alt="client profile"
                />
              </div>

              <div className="cp-middle">
                <name style = {{ fontSize: '24px', fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                  <strong>{client.firstname} {client.lastname}</strong>
                </name>
              </div>

              <div className="cp-right">
                <button
                  onClick={() => handleClientSelect(client.clientID)}
                  className="cp-view"
                  style = {{ fontSize: '24px', fontFamily: 'Copperplate, Papyrus, fantasy' }}
                >
                  VIEW PROFILE
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      <div className="cp-pagination">
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
