import React from 'react';
import { NavLink } from 'react-router-dom';
import '../stylesheets/Nav.css';

function Navbar() {
  return (
    <div className='container navbar-container' style={{ padding: '10px 20px', borderRadius: '50px' }}>
    <nav className='navbar' style={{ textAlign: 'center' }}>
      <ul>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/bookings">Bookings</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/gallery">Gallery</NavLink></li>
      </ul>
    </nav>
    </div>
  );
}

export default Navbar;
