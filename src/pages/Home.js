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
   <div className='container1x1' style={{ width: '100%', maxWidth: '1000px', flex: 'none' }}>
      <h2>Our Face Painting Packages</h2>
      <p>We supply the paint, the brushes, and the funny faces. You supply the kids!</p>
      
      <div className="packages-grid">
        <div className="package-card">
          <h3 style={{ color: 'var(--purple)', fontSize: '1.5rem' }}>Hourly Rate</h3>
          <div className="package-price">$[Price] / hr</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0' }}>
            <li style={{ padding: '0.5rem 0' }}>✓ Perfect for small parties</li>
            <li style={{ padding: '0.5rem 0' }}>✓ 10-15 faces painted</li>
            <li style={{ padding: '0.5rem 0' }}>✓ 2 hr minimum booking</li>
          </ul>
          <Link to="/bookings" className="button" style={{ display: 'inline-block', marginTop: '1rem' }}>Book Hourly</Link>
        </div>

        <div className="package-card" style={{ border: '3px solid var(--pink)', transform: 'scale(1.05)' }}>
          <div style={{ background: 'var(--pink)', color: 'white', padding: '0.5rem', fontWeight: 'bold', borderRadius: '10px 10px 0 0', marginTop: '-2rem', marginBottom: '1rem' }}>Most Popular</div>
          <h3 style={{ color: 'var(--purple)', fontSize: '1.5rem' }}>The Birthday Special</h3>
          <div className="package-price">$[Price]</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0' }}>
            <li style={{ padding: '0.5rem 0' }}>✓ 2.5 hours of painting</li>
            <li style={{ padding: '0.5rem 0' }}>✓ Up to 25 kids</li>
            <li style={{ padding: '0.5rem 0' }}>✓ Special design for the birthday child</li>
          </ul>
          <Link to="/bookings" className="button" style={{ display: 'inline-block', marginTop: '1rem' }}>Book the Special</Link>
        </div>

        <div className="package-card">
          <h3 style={{ color: 'var(--purple)', fontSize: '1.5rem' }}>Corporate Events</h3>
          <div className="package-price">Contact Us</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0' }}>
            <li style={{ padding: '0.5rem 0' }}>✓ Multiple artists available</li>
            <li style={{ padding: '0.5rem 0' }}>✓ Custom branding/designs</li>
            <li style={{ padding: '0.5rem 0' }}>✓ Fully insured</li>
          </ul>
          <Link to="/contact" className="button" style={{ display: 'inline-block', marginTop: '1rem' }}>Get a Quote</Link>
        </div>
      </div>
    </div>
    </div>

    <div className='parent-container' style={{ animation: 'fadeInUp 1.1s ease', animationFillMode: 'both' }}>
      <div className='container1x1' style={{ minWidth: '300px' }}>
        <h2>Meet the Funny Fullas</h2>
        <p>Learn about what makes us Funny!</p> 
        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/about" className="button">Find out more</Link>
        </div>
      </div>

      <div className='container1x1' style={{ minWidth: '300px' }}>
        <h2>What Parents Say</h2>
        <div className="testimonial-card">
          <p>"The best face painter we've ever had! The kids didn't want to wash their faces before bed. Highly recommend Funny Fullas!"</p>
          <div style={{ marginTop: '1rem', fontWeight: 'bold', color: 'var(--pink)' }}>- Sarah, 5th Birthday Party</div>
        </div>
      </div>
    </div>

    <div className='container' style={{ animation: 'fadeInUp 1.15s ease', animationFillMode: 'both' }}>
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <div className="faq-question">What kind of paint do you use?</div>
        <p>We use professional, FDA-approved, hypoallergenic cosmetic-grade face and body paints. They are completely safe for sensitive skin!</p>
      </div>
      <div className="faq-item">
        <div className="faq-question">How do I wash it off?</div>
        <p>Warm water, a soft cloth, and a gentle soap or baby shampoo will take the paint right off. No scrubbing needed!</p>
      </div>
      <div className="faq-item">
        <div className="faq-question">Do I need to leave a deposit?</div>
        <p>Yes, we ask for a small deposit to secure your date and time in our calendar.</p>
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