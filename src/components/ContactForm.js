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
    <div className="form-wrapper">
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {/* Honeypot trap */}
          <input type="text" name="_honey" style={{ display: "none" }} />
          <input type="hidden" name="_captcha" value="false" />

          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <br />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <br />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
          <br />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="thank-you-message">
          <h2>Ngā mihi!</h2>
          <p>Your message has been sent to our inbox. We'll be in touch soon!</p>
        </div>
      )}
    </div>
  )
}

export default ContactForm
