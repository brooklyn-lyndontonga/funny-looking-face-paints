import React from "react";

function Calendar() {
  return (
    <div>
      <h1>Calendar</h1>
      <p>Check out the calendar for available dates</p>
    <iframe
      title="Google Calendar"
      src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Pacific%2FAuckland&showPrint=0&showTz=0&showCalendars=0&showTitle=0&src=ZnVubnlsb29raW5nNDAxMEBnbWFpbC5jb20&color=%23cc89c2"
      style={{
        borderWidth: 0,
      }}
      width="600"
      height="400"
    ></iframe>
   </div>
  );
}

export default Calendar;