import React, { useState } from "react";

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

          <label htmlFor="time">Time:</label>
          <input type="time" id="time" name="time" required />
          <br />

          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" required />
          <br />

          <label htmlFor="message">Tell Us About Your Event:</label>
          <textarea id="message" name="message" required></textarea>
          <br />

          <button type="submit">Submit Booking</button>
        </form>
      ) : (
        <div className="thank-you-message">
          <h2>Ngā mihi nui!</h2>
          <p>Your booking has been sent! We'll be in touch very soon to secure and confirm your booking.</p>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
