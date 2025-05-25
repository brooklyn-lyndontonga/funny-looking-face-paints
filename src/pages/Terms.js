import React from "react";

function Terms() {
  return (
    <div className="container" style={{ textAlign: "left", listStyleType: 'none' }}>
      <h1>Terms and Conditions</h1>
      <p><em>Effective Date: 18 April 2025</em></p>
      <p>These Terms and Conditions constitute a binding agreement between the client (“you”) and Funny Looking Face Paints (“the Artist”). By booking services, you agree to the terms outlined below.</p>

      <div className="section">
        <h2>1. Bookings and Payment</h2>
        <p>50% non-refundable deposit required.</p>
        <p>Booking not confirmed until deposit is received.</p>
        <p>Remaining balance due on or before the event date.</p>
        <p>Accepted methods: bank transfer, cash, PayPal.</p>
      </div>

      <div className="section">
        <h2>2. Cancellations and Refunds</h2>
        <p>If you cancel your booking, the deposit will not be refunded.</p>
        <p>If the Artist cancels your booking, a full refund will be provided.</p>
      </div>

      <div className="section">
        <h2>3. Event Details</h2>
        <p>Please provide the Artist with the following details:</p>
        <p>Event date and time</p>
        <p>Event location</p>
        <p>Number of guests</p>
        <p>Any specific design requests</p>
      </div>

      <div className="section">
        <h2>4. Conduct and Behavior</h2>
        <p>The Artist reserves the right to terminate the event if the client or guests behave in a manner that is deemed unacceptable.</p>
        <p>The client is responsible for ensuring that all guests are aware of and comply with the Artist's rules and regulations.</p>
      </div>

      <div className="section">
        <h2>5. Liability and Indemnity</h2>
        <p>The Artist will not be liable for any damages or losses arising from the event, except to the extent that such damages or losses are caused by the Artist's negligence or breach of these Terms and Conditions.</p>
        <p>The client will indemnify the Artist against any claims, damages, or losses arising from the event, except to the extent that such claims, damages, or losses are caused by the Artist's negligence or breach of these Terms and Conditions.</p>
      </div>

      <div className="section">
        <h2>6. Governing Law and Jurisdiction</h2>
        <p>These Terms and Conditions will be governed by and construed in accordance with the laws of [State/Country].</p>
        <p>Any disputes arising from these Terms and Conditions will be resolved through [Dispute Resolution Process].</p>
      </div>

      <div className="section">
        <h2>Contact</h2>
        <p>Funny Looking Face Paints</p>
        <p>7 Rawiri Tamanui Place, Whatatutu 4094</p>
        <p>021 66 99 04</p>
        <p>funnylooking4010@gmail.com</p>
      </div>

      <p>
        Thanks for taking the time to read this. I'm looking forward to working with you and making some magic happen!
      </p>
    </div>
  );
}

export default Terms;