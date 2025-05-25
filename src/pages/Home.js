import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import logo from '../img/Logo/1.png';
import placeholder from '../img/placeholder.jpg';


function Home() {
  return (
    <>
      <Header />
      <main>
    <div class='container'> 
      <h1>Nau Mai!</h1>
      <h2>Welcome to the home of Funny Looking Face Paints</h2>
      <img className="bannerImg" src={logo} alt="Logo" />
      <p>Where we make the funniest faces in Tairawhiti.</p>
      <p>Bookings are now open, so secure your spot now!</p>
    </div>
   <div class='container'>
  {/* about */}
  <h2>Meet the Funny Fullas Behind the Funny Face Paintings</h2>
  <p>Learn about what makes us Funny! <a href="./About">click here</a></p>
</div>
<div class='container'>
  {/* booking */}
  <h2>Book Us For Your Next Party</h2>
  <p>Chech out our <a href="./Calendar">Calendar</a> for available dates</p>
</div>
    <div class='container'>
      {/* gallery */}
      <h2>Checkout Some of Our Work</h2>
      <Link to="/gallery">
  <img src={placeholder} alt="Placeholder" />
</Link>
    </div>
    </main>
      </>
  );
}

export default Home;