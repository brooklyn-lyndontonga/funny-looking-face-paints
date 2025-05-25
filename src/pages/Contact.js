import React from "react";
import ContactForm from "../components/ContactForm";
import Socials from "../components/Socials";

function Contact() {
  return (
    <>
    <div className="container">
      <div>
        <h1>Contact Us</h1>
        <p>Send me a message and I'll get back to you as soon as I can!</p>
      </div>   
      <div>
        <ContactForm />
         <div className="section"></div>
        <Socials />
      </div>
     </div>
    </>
  );
}

export default Contact;