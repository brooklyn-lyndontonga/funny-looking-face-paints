import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "../stylesheets/BookingForm.css";

function BookingForm({ selectedDate }) {
  const [submitted, setSubmitted] = useState(false);
  const [dateValue, setDateValue] = useState("");

  useEffect(() => {
    if (selectedDate) {
      setDateValue(format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch("https://formsubmit.co/funnylooking4010@gmail.com", {
      method: "POST",
      body: new FormData(form),
    })
      .then((response) => {
        if (response.ok) {
          setSubmitted(true);
          form.reset();
        } else {
          alert("Oops! Something went wrong.");
        }
      })
      .catch((error) => {
        console.error("Form error:", error);
        alert("There was an error submitting the form.");
      });
  };

  return (
    <div className="booking-form-container" style={{ margin: 0, width: '100%', maxWidth: 'none', border: 'none', boxShadow: 'none' }}>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {/* Honeypot for bots */}
          <input type="text" name="_honey" style={{ display: "none" }} />
          <input type="hidden" name="_captcha" value="false" />

          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="date">Selected Date: <br /><span style={{fontWeight: 'normal', fontSize: '0.9rem', color: '#666'}}>(Change this using the calendar)</span></label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            value={dateValue} 
            readOnly 
            required 
            style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
          />

          <label htmlFor="start-time">Start Time:</label>
          <input type="time" id="start-time" name="start-time" required />

          <label htmlFor="end-time">End Time:</label>
          <input type="time" id="end-time" name="end-time" required />

          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" required />

          <label htmlFor="message">Tell me about your event:</label>
          <textarea id="message" name="message" rows="4" required></textarea>

          <button type="submit" className="button" style={{marginTop: '20px'}}>Submit Request</button>
        </form>
      ) : (
        <div style={{textAlign: 'center', padding: '40px 20px'}}>
        <h2 style={{color: 'var(--pink)'}}>🎉 Thanks! 🥳</h2>
        <p>Your booking request for {format(selectedDate, "MMM do, yyyy")} has been sent.</p>
        <p>📩 I'll carefully review my schedule and be in touch soon.</p>
        </div>
      )}
    </div>
  );
}

export default BookingForm;