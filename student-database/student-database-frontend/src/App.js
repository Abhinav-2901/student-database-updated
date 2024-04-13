import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Registration from './components/Registration';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import ShowStudentsData from './components/ShowStudentsData';
import InsertStudentsRecord from './components/InsertStudentsRecord';
import SearchStudentRecord from './components/SearchStudentRecord';
import Profile from './components/Profile'; 

function App() {
  return (
    <Router>
      <div>
        <div className="container-fluid">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/landing" element={<LandingPage />} />
            <Route exact path="/register" element={<Registration />} />         
            <Route exact path="/show" element={<ShowStudentsData />} />
            <Route exact path="/insert" element={<InsertStudentsRecord />} />
            <Route exact path="/search" element={<SearchStudentRecord />} />
            <Route exact path="/profile" element={<Profile />} /> {/* Add this route for the Profile component */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
