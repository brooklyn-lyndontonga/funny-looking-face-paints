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
    <div className='container'> 
      <h1>Nau Mai!</h1>
      <h2>Welcome to the home of Funny Looking Face Paints</h2>
      <img className="bannerImg" src={logo} alt="Logo" />
      <p>Where we make the funniest faces in Tairawhiti.</p>
      <p>Bookings are now open, so secure your spot now!</p>
    </div>
    <div className='parent-container'>
   <div className='container1x1'>
  {/* about */}
  <h2>Meet the Funny Fullas Behind the Funny Face Paintings</h2>
  <p>Learn about what makes us Funny!</p> 
    <p><a href="./About">Click here</a></p>
</div>
</div>
    <div className='container'>
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