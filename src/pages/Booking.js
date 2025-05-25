import React from 'react'; 
import BookingForm from '../components/BookingForm';
import '../stylesheets/BookingForm.css';

function Bookings() {
  return (
    <>
    <div className='container'>
      <h2>Make a Booking</h2>
      <p>Fill out the form below to get on the books and you'll get confirmation in your inbox soon!</p>
      </div>
      <div className='container'>
      <BookingForm />
    </div>
    </>
  );
}

export default Bookings;