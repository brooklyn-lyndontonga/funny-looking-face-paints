import React from 'react';
import '../stylesheets/Nav.css';

function Navbar() {
  return (
    <div className='container'>
    <nav className='navbar' style={{ textAlign: 'center' }}>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/bookings">Bookings</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/calendar">Calendar</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/gallery">Gallery</a></li>
      </ul>
    </nav>
    </div>
  );
}

export default Navbar;
