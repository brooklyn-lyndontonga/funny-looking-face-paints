import React from 'react';

function Navbar() {
  return (
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
  );
}

export default Navbar;
