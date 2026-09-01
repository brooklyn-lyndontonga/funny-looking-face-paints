import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "../stylesheets/BookingForm.css";

// ── AUTOMATION SETUP ──────────────────────────────────────────────
// Paste your Google Apps Script web app URL here (ends in /exec).
// While this is empty, the form keeps working exactly as it does today
// (email via FormSubmit), so it's safe to deploy this file right away.
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwPQ01EGKzY6V6fq15mLi5fZIwLrmHLWHMwZAHOqteZTA8D8vkBaj_OjFqMmEp8-Q2eqg/exec";
// Set to false once you trust the automation flow and no longer want the
// plain FormSubmit email as a backup notification.
const SEND_FORMSUBMIT_BACKUP = true;
// ──────────────────────────────────────────────────────────────────

function BookingForm({ selectedDate }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [dateValue, setDateValue] = useState("");

  useEffect(() => {
    if (selectedDate) {
      setDateValue(format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    setSending(true);

    // Build a clean JSON payload for Zapier (webhooks parse JSON reliably)
    const payload = Object.fromEntries(formData.entries());
    payload.submittedAt = new Date().toISOString();

    const requests = [];

    if (WEBHOOK_URL) {
      requests.push(
        // text/plain avoids a CORS preflight, which Apps Script can't answer.
        // The body is still JSON — the script parses it on the other end.
        fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        })
      );
    }

    if (!WEBHOOK_URL || SEND_FORMSUBMIT_BACKUP) {
      requests.push(
        fetch("https://formsubmit.co/ajax/funnylooking4010@gmail.com", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        })
      );
    }

    try {
      const results = await Promise.allSettled(requests);
      const anySuccess = results.some(
        (r) => r.status === "fulfilled" && r.value.ok
      );

      if (anySuccess) {
        setSubmitted(true);
        form.reset();
      } else {
        console.error("Booking submission failed:", results);
        alert("Oops! Something went wrong sending your booking. Please try again or contact me directly.");
      }
    } catch (error) {
      console.error("Form error:", error);
      alert("There was an error submitting the form.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="booking-form-container" style={{ margin: 0, width: '100%', maxWidth: 'none', border: 'none', boxShadow: 'none' }}>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {/* Honeypot for bots — also sent to Zapier so a Filter step can drop spam */}
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

          <button type="submit" className="button" style={{marginTop: '20px'}} disabled={sending}>
            {sending ? "Sending..." : "Submit Request"}
          </button>
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