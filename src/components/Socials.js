import React from "react";
import "../stylesheets/Socials.css";

function Socials() {
  return (
    <div>
      <h1>Follow The Funny Looking Socials</h1>
      <ul className='socials-list'>
        <li><a href="https://www.instagram.com/funnylookingfacepaints/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://www.tiktok.com/@funnylookingfacep?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">TikTok</a></li>
        <li><a href="https://www.facebook.com/profile.php?id=61576253596992/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
      </ul>
    </div>
  );
}

export default Socials;