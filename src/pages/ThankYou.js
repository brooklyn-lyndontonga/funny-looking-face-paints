// src/pages/ThankYou.jsx
import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="thank-you-container" style={styles.container}>
      <h1 style={styles.title}>Ngā mihi! 🎉</h1>
      <p style={styles.text}>
        Your booking request has been sent! I'll be in touch as soon as poss
      </p>
      <p style={styles.text}>
        If you don’t hear from me in 24 hours, check your spam folder or send a cheeky follow-up!
      </p>
      <Link to="/" style={styles.button}>Back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    padding: "3rem",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "1rem",
  },
  button: {
    display: "inline-block",
    marginTop: "2rem",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#f296bd",
    color: "#000",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "bold",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "transform 0.2s ease-in-out",
  },
};

export default ThankYou;
