import React, { useState, useEffect } from 'react';
import './jd.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './conponents/navbar';
import Home from './conponents/home';
import About from './conponents/login'; // You can rename this to About if needed
import Projects from './conponents/projects';
import Contact from './conponents/contact';
import Login from './conponents/login'; // Your login/signup page
import Ss from './conponents/Ss'; // Your protected page (ex: NewsApp)

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Optional: Persist login across refresh
  useEffect(() => {
    const savedLogin = localStorage.getItem('isLoggedIn');
    if (savedLogin === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Login route */}
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/ss" replace /> : <Login onLoginSuccess={handleLoginSuccess} />
        } />

        {/* Protected route */}
        <Route path="/ss" element={
          isLoggedIn ? <Ss /> : <Navigate to="/login" replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;
