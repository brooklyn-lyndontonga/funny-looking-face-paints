import BookingForm from '../components/BookingForm';
import Navbar from '../components/Navbar';

function Bookings() {
  return (
    <>
    <Navbar />
    <div>
      <h2>Make a Booking</h2>
      <p>Fill out the form below to get on the books and you'll get confirmation in your inbox soon!</p>
      <BookingForm />
    </div>
    </>
  );
}

export default Bookings;