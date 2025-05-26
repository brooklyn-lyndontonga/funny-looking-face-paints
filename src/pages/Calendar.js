import React from "react";
import "../stylesheets/Calendar.css";

function Calendar() {
  return (
    <div className="container">
      <h1>Calendar</h1>
      <p>Check out the calendar for available dates</p>
      <div className="calendar-embed-wrapper">
        <iframe
          title="Google Calendar"
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Pacific%2FAuckland&showPrint=0&showTz=0&showCalendars=0&showTitle=0&src=ZnVubnlsb29raW5nNDAxMEBnbWFpbC5jb20&color=%23cc89c2"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Calendar;
