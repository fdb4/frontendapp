import React, { useState, useEffect } from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
// import "../../../roles/client/styling/clientcoaches.css";
import "../styling/coachclient.css"
import { Link } from "react-router-dom";
import Coach from "../../visitors/assets/coach.png";

function ClientProfiles() {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    value: "",
  });

  useEffect(() => {
    fetchData();
  }, [filters, searchTerm]);

  const fetchData = async () => {
    try {
      let url = "http://127.0.0.1:5000/clients/profiles";
      const response = await fetch(url);
      const data = await response.json();

      // Filter based on search term
      const filteredClients = data.filter((client) =>
        client.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
        // Add more fields as needed
      );

      setClients(filteredClients);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      {/* ... (existing code) */}
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
    
      {currentClients.map((client) => (
        <div key={client.email} className="profile">
          <div className="left">
            {/* <img className="img" src={Coach} alt="coach profile" /> */}
            <name>{client.firstname} {client.lastname}</name>
            <age>Age: {client.age}</age>
            {/* Add other client information fields as needed */}
          </div>

          <div className="middle">
            <div className="location">
              <email>Email: {client.email}</email>
              {/* Add other client information fields as needed */}
            </div>
            <div className="middle_2">
              <movement>Movement: {client.movement}</movement>
              {/* Add other client information fields as needed */}
            </div>
          </div>

            <div className="right">
              <div className="contact">
                <contact>CONTACT</contact>
                <email>Email: {client.email}</email>
              </div>
              <Link to={`/clients/${client.clientID}`} className="view">VIEW PROFILE</Link>
            </div>
        </div>
      ))}
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
