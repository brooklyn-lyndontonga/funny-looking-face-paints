import React from "react";

function ContactForm() {
  return (
    <div>
      <form
        action="https://formsubmit.co/funnylooking4010@gmail.com"
        method="POST"
      >
        {/* 🕵️‍♀️ HONEYPOT FIELD – hidden from humans */}
        <input type="text" name="_honey" style={{ display: "none" }} />

        {/* ✅ Redirect after submission */}
        <input type="hidden" name="_next" value="https://yourwebsite.com/thank-you" />

        {/* Optional: turn off captcha (optional) */}
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
    </div>
  );
}

export default ContactForm;
