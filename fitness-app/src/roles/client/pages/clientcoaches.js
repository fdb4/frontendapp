import React, { useState, useEffect } from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import "../styling/clientcoaches.css"; // Import your CSS file for styling

function ClientCoaches() {
  const [coaches, setCoaches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coachesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/coaches");
      const data = await response.json();
      setCoaches(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Pagination
  const indexOfLastCoach = currentPage * coachesPerPage;
  const indexOfFirstCoach = indexOfLastCoach - coachesPerPage;
  const currentCoaches = coaches.slice(indexOfFirstCoach, indexOfLastCoach);
  const totalPages = Math.ceil(coaches.length / coachesPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Search
  const handleSearch = () => {
    const filteredCoaches = coaches.filter(
      (coach) =>
        coach.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCoaches(filteredCoaches);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  return (
    <div className="body_1">
      <ClientNavbar />
      <h1>Coaches Page</h1>

      {/* Search form */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display coaches in a table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Experience</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {currentCoaches.map((coach) => (
            <tr key={coach.clientID}>
              <td>{coach.firstname} {coach.lastname}</td>
              <td>{coach.email}</td>
              <td>{coach.rating}</td>
              <td>{coach.experience}</td>
              <td>{coach.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastCoach >= coaches.length}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ClientCoaches;