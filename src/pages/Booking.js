import React, { useState } from 'react'; 
import Calendar from 'react-calendar';
import BookingForm from '../components/BookingForm';
import { isSameDay, addDays } from 'date-fns';
import '../stylesheets/BookingForm.css';
import '../stylesheets/Calendar.css';
// import 'react-calendar/dist/Calendar.css'; // custom styles cover this, but we can import if needed

// Dummy booked dates to demonstrate availability (e.g. today + 2, today + 5)
const bookedDates = [
  addDays(new Date(), 2),
  addDays(new Date(), 5),
  addDays(new Date(), 7),
];

function Bookings() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const isDateBooked = (date) => {
    return bookedDates.some(bookedDate => isSameDay(bookedDate, date));
  };

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      // Disable if booked or in the past
      const today = new Date();
      today.setHours(0,0,0,0);
      return isDateBooked(date) || date < today;
    }
    return false;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (isDateBooked(date)) return 'booked-date';
    }
  };

  return (
    <>
      <div className='container'>
        <h2>Make a Booking</h2>
        <p>Pick an available date from the calendar and fill out the form below to get on the books. You'll get confirmation in your inbox soon!</p>
      </div>

      <div className='booking-layout'>
        <div className='booking-calendar-section'>
          <div className='container' style={{ height: '100%' }}>
            <h3>1. Select a Date</h3>
            <Calendar 
              onChange={onDateChange} 
              value={selectedDate} 
              tileDisabled={tileDisabled}
              tileClassName={tileClassName}
              minDate={new Date()}
            />
            <div style={{ marginTop: '1rem', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <span style={{display: 'flex', alignItems: 'center', fontSize: '0.9rem'}}><div style={{width: 15, height: 15, background: 'var(--pink)', borderRadius: 4, marginRight: 5}}></div> Selected</span>
                <span style={{display: 'flex', alignItems: 'center', fontSize: '0.9rem'}}><div style={{width: 15, height: 15, background: '#f0f0f0', border: '1px solid #ccc', borderRadius: 4, marginRight: 5}}></div> Unavailable</span>
            </div>
          </div>
        </div>

        <div className='booking-form-section'>
          <div className='container' style={{ height: '100%', margin: '0' }}>
            <h3>2. Enter Details</h3>
            <BookingForm selectedDate={selectedDate} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookings;