import React, { useState } from "react";

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const form = e.target

    fetch("https://formsubmit.co/funnylooking4010@gmail.com", {
      method: "POST",
      body: new FormData(form)
    })
      .then(response => {
        if (response.ok) {
          setSubmitted(true)
          form.reset()
        } else {
          alert("Oops! Something went wrong.")
        }
      })
      .catch(error => {
        console.error("Form error:", error)
        alert("There was an error submitting the form.")
      })
  }

  return (
  <div className="booking-form-container">
    {!submitted ? (
      <form onSubmit={handleSubmit}>
        {/* Honeypot for bots */}
        <input type="text" name="_honey" style={{ display: "none" }} />
        <input type="hidden" name="_captcha" value="false" />

        <div className="form-section">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="form-section">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required />
        </div>

        <div className="form-section">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="form-section">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" required />
        </div>

        <div className="form-section">
          <label htmlFor="time">Time:</label>
          <input type="time" id="time" name="time" required />
        </div>

        <div className="form-section">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" required />
        </div>

        <div className="form-section">
          <label htmlFor="message">Tell Us About Your Event:</label>
          <textarea id="message" name="message" required></textarea>
        </div>

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
export default ContactForm
