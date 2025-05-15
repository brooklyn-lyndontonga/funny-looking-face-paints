import BookingForm from '../components/BookingForm';
import Navbar from '../components/Navbar';

function Bookings() {
  return (
    <>
    <Navbar />
    <div>
      <h2>Make a Booking</h2>
      <BookingForm />
    </div>
    </>
  );
}

export default Bookings;