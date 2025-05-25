import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './stylesheets/style.css';
// import the rest of the pages here
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Booking from './pages/Booking';
import About from './pages/About';
import Calendar from './pages/Calendar';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Terms from './pages/Terms'; // new import
import Policy from './pages/Policy'; // new import
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/about" element={<About />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/terms" element={<Terms />} /> 
        <Route path="/policy" element={<Policy />} />
        </Routes>
      </main>
      <Footer />
    </Router>
    );
}

export default App;