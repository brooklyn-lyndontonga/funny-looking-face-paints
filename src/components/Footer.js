import React from "react";
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>Funny Looking Face Paints</h3>
          <p>Where we make the funniest faces in Tairāwhiti.</p>
          <div style={{ marginTop: '1rem' }}>
            <a href="https://www.instagram.com/funnylookingfacepaints/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.facebook.com/profile.php?id=61576253596992/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://www.tiktok.com/@funnylookingfacep?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="TikTok"><FaTiktok /></a>
          </div>
        </div>
        
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/bookings">Bookings</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3>Information</h3>
          <ul>
            <li><Link to="/policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li>Email: funnylooking4010@gmail.com</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Funny Looking Face Paints. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;