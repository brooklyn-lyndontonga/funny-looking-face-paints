import Header from "../components/Header";
import Navbar from "../components/Navbar";


function Home() {
  return (
    <>
      <Header />
      <Navbar />
    <div>
      <h1>Nau Mai!</h1>
      <h2>Welcome to the virtual home of Funny Looking Face Paints</h2>
      <p>Where we make the funniest face in Tairawhiti.</p>
      <p>Bookings are now open! Click <a href="/bookings">here</a> to make a booking.</p>
    </div>
    <div>
      {/* about */}
        <h2>Meet the Funny Fullas Behind the Funny Face Paintings</h2>
    </div>
    <div>
      {/* booking */}
        <h2>Book Us For Your Next Party</h2>
        <p>Lorem ipsum dolor sit amet</p>
    </div>
    <div>
      {/* contact */}
      <h2>Get In Touch for More Information</h2>
      <p>Lorem ipsum dolor sit amet</p>
    </div>
    <div>
      {/* Gallery */}
      <p>Lorem ipsum dolor sit amet</p>
    </div>
      </>
  );
}

export default Home;