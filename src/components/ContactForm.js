import React, { useState } from "react";
import "../stylesheets/ContactForm.css";

function ContactForm() {
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
    <div className="contact-form-container">
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
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required />
          </div>

          <button type="submit">Send</button>
        </form>
      ) : (
        <div className='container'>
        <p>📬 Thanks for your message!</p>
        <p>I'll get back to you as soon as I can.</p>
        </div>
      )}
    </div>
  );
}

export default ContactForm;