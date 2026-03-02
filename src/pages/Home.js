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
    <div className='container' style={{ padding: '3rem 1.5rem', animation: 'fadeInUp 0.8s ease' }}> 
      <h1 style={{ fontSize: '3.5rem' }}>Nau Mai!</h1>
      <h2>Welcome to the home of Funny Looking Face Paints</h2>
      <img className="bannerImg" src={logo} alt="Logo" style={{ maxWidth: '300px', margin: '2rem auto' }} />
      <p className="tagline">Where we make the funniest faces in Tairāwhiti.</p>
      <div style={{ margin: '2rem 0' }}>
         <Link to="/bookings" className="button" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>Book Your Spot Now</Link>
      </div>
    </div>
    
    <div className='parent-container' style={{ animation: 'fadeInUp 1s ease', animationFillMode: 'both' }}>
   <div className='container1x1'>
  {/* about */}
  <h2>Meet the Funny Fullas Behind the Funny Face Paintings</h2>
  <p>Learn about what makes us Funny!</p> 
  <div style={{ marginTop: '1.5rem' }}>
    <Link to="/about" className="button">Find out more</Link>
  </div>
</div>
</div>
    <div className='container' style={{ animation: 'fadeInUp 1.2s ease', animationFillMode: 'both' }}>
      {/* gallery */}
      <h2>Checkout Some of Our Work</h2>
      <Link to="/gallery">
  <img src={placeholder} alt="Placeholder" style={{ transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}/>
</Link>
    </div>
    </main>
      </>
  );
}

export default Home;