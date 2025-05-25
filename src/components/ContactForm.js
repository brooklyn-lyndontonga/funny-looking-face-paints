import React, { useState } from "react";
import "../stylesheets/ContactForm.css";

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
          <label htmlFor="message">How Can I Help?:</label>
          <textarea id="message" name="message" required></textarea>
        </div>

        <button type="submit">Send</button>
      </form>
    ) : (
      <div className="thank-you-message">
        <h2>Ngā mihi nui!</h2>
        <p>Your message has been sent!!</p>
        <p>Thanks for reaching out to us. I'll get back to you as soon as we can.</p>
        <p>Checkout our socials for more fun!</p>
      </div>
    )}
  </div>
);
}
export default ContactForm
