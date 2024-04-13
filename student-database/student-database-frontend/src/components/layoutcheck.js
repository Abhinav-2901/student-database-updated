// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';

function App() {
  const isAuthenticated = sessionStorage.getItem('token') !== null;

  return (
    <Router>
      {isAuthenticated ? (
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Layout>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </Layout>
      )}
    </Router>
  );
}

export default App;
