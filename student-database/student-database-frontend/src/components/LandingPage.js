import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate(); // Hook to navigate to different routes

  useEffect(() => {
    // Check if token exists in session storage
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to '/' if token is empty
    }
  }, [navigate]);

  return (
    <>
      <Navbar /> {/* Include the Navbar component */}
      <div
        className="min-vh-100 d-flex justify-content-center align-items-center"
        style={{
          background: 'linear-gradient(to right, #4a148c, #ff6f00)' // Example gradient colors
        }}
      >
        <div className="container text-center text-light">
          <div className="mb-5">
            <h1 className="display-4">Welcome to Students Data</h1>
            <p className="lead">Manage your student records with ease.</p>
          </div>
          <div>
            <a className="btn btn-outline-light btn-lg me-3" href="/show">Show Students Data</a>
            <a className="btn btn-outline-light btn-lg me-3" href="/insert">Insert Students Record</a>
            <a className="btn btn-outline-light btn-lg" href="/search">Search Student Record</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
