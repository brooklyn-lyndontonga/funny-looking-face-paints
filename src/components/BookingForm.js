function BookingForm() {
  return (
    <div>
    <form>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />
      <br />
      <label htmlFor="phone">Phone:</label>
      <input type="tel" id="phone" name="phone" required />
      <br />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <br />
      <label htmlFor="date">Date:</label>
      <input type="date" id="date" name="date" required />
      <br />
      <label htmlFor="time">Time:</label>
      <input type="time" id="time" name="time" required />
      <br />
      <label htmlFor="location">Location:</label>
      <input type="text" id="location" name="location" required />
      <br />
      <label htmltFor=""></label>
      <label htmlFor="message">Tell Us About Your Event:</label>
      <textarea id="message" name="message" required></textarea>
      <br />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default BookingForm;