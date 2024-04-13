import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/landing");
    }
  }, [navigate]); // Empty dependency array ensures this effect runs only once on component mount

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        username,
        password,
      });
      console.log(response.data);
      if (response.status === 200) {
        setSuccessMessage("Registration successful");
        setErrorMessage("");
        setName("");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.status === 409) {
        setErrorMessage(
          "Username already exists. Please choose a different username."
        );
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #4a148c, #ff6f00)",
      }}
    >
      <div
        className="card p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 className="card-title text-center mb-4">New User Registration</h2>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn btn-primary btn-block mb-3"
          onClick={handleRegister}
        >
          Register
        </button>
        <p className="text-center">
          Existing User? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
