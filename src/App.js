import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
// import the rest of the pages here
import Home from './pages/Home';
import Booking from './pages/Booking';

function App() {
  return (
    <Router>
    
      {/* components/pages link in here - to be built */}
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Booking />} />
          {/* 
          About
          Calendar
          Contact
          Gallery 
          */}
        </Routes>
      </main>
    </Router>
    );
}

export default App;