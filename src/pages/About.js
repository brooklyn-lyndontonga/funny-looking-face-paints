import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className='container'>
      <div>
      <h1>The Funny Looking Story</h1>
      <p className="paragraph">Kia ora! Ko Brooky ahau — māmā, face painter, and CEO of creativity at Funny Looking Face Paints. My face painting journey started off at my baby’s first birthday when I ordered a set of professional face paints and brushes and thought, “Eh, how hard can it be?”, Famous last words.</p>
      <p className="paragraph">Now I run a one-wāhine show where glitter is a priority, tamariki are the real bosses, and the vibe is always Whānau First. My kaupapa is simple: bring joy, colour, and a bit of that magic to every occasion — whether it’s a birthday, a whanau day at the Pā, or You're a Grown Up who just wants your tamaiti to sit still for 5 minutes.</p>
      <p className="paragraph">I’m not fancy — just passionate. I’m Passionate about our tamariki, whānau, and those messy, blissful moments where your kid is frothing because they are now a rainbow-unicorn-dinosaur-mermaid hybrid. If the paint’s a bit crooked, kei te pai. If the kids are smiling, that’s the real masterpiece.</p>
        <img src="src/img/placeholder.jpg" alt="Placeholder" /> 
        <div className="paragraph">
        <h3 ><Link to="/terms">Terms and Conditions</Link></h3>
        <h3><Link to="/policy">Policy</Link></h3>
        </div>
        <p className="paragraph">For more information, check out our <Link to="/contact">Contact</Link> page to send me a message,
        or visit the <Link to="/calendar">Calendar</Link> to see when I'm available.
      </p>
      </div>
    </div>
  );
}

export default About;