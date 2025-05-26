import React, { useState } from "react";
import "../stylesheets/BookingForm.css";

function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

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
    <div className="booking-form-container">
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {/* Honeypot for bots */}
          <input type="text" name="_honey" style={{ display: "none" }} />
          <input type="hidden" name="_captcha" value="false" />

          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <br />

          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required />
          <br />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <br />

          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" required />
          <br />

          <label htmlFor="start-time">Start Time:</label>
          <input type="time" id="start-time" name="start-time" required />
          <br />

          <label htmlFor="end-time">End Time:</label>
          <input type="time" id="end-time" name="end-time" required />
          <br />

          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" required />
          <br />

          <label htmlFor="message">Tell me about your event:</label>
          <input type="text" id="message" name="message" required />
          <br />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className='container'>
        <p>🎉Thanks for submitting the form!🥳</p>
        <p>📩I'll be in touch soon.</p>
        </div>
      )}
    </div>
  );
}

export default BookingForm;