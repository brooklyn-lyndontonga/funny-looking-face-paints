# Free booking automation — setup guide

Total cost: $0. Time: about 20 minutes.

## Part 1 — The Apps Script (the engine)

1. Go to sheets.google.com (signed in as funnylooking4010@gmail.com) and create a
   new spreadsheet. Name it something like **FLFP Bookings**. This becomes your
   booking database — every request lands here automatically.
2. In the sheet: **Extensions → Apps Script**. Delete the placeholder code and
   paste in the whole of `Code.gs`.
3. At the top of the code, check the `CONFIG` block:
   - `YOUR_EMAIL` — already set to your Gmail.
   - `BANK_ACCOUNT` — put your real account number in (it prints on invoices).
   - Leave `INVOICE_TEMPLATE_DOC_ID` empty for now (a clean invoice is generated
     automatically; see Part 3 to use your own design later).
4. Click the **⚙ Project Settings** (gear icon, left sidebar) and set the
   time zone to **Pacific/Auckland** so calendar events land at the right time.
5. **Deploy → New deployment → ⚙ → Web app**:
   - Description: anything
   - Execute as: **Me**
   - Who has access: **Anyone**  ← required so your website can post to it
6. Click Deploy, authorise it with your Google account (it will warn that the
   app is unverified because you wrote it yourself — click Advanced → Go to
   project). Copy the URL ending in **/exec**.

## Part 2 — The website form

1. Replace `src/components/BookingForm.js` in your repo with the new version.
2. Paste the /exec URL into the `WEBHOOK_URL` constant at the top.
3. Commit, push, and let your site redeploy.

While `WEBHOOK_URL` is empty the form behaves exactly as it does today, so you
can merge the code change before the script is ready. And with
`SEND_FORMSUBMIT_BACKUP = true` you'll keep getting the plain FormSubmit email
as well, as a safety net — flip it to `false` once you trust the new flow.

## Part 3 (optional) — Your own invoice design

1. Create a Google Doc and lay out your invoice however you like (logo,
   colours, etc.). Wherever booking details should appear, type these
   placeholders exactly:

   {{InvoiceNumber}}  {{InvoiceDate}}  {{ClientName}}  {{ClientEmail}}
   {{ClientPhone}}  {{EventDate}}  {{EventTime}}  {{Location}}
   {{Amount}}  {{BankAccount}}

2. Copy the Doc's ID from its URL (the long string between /d/ and /edit) and
   paste it into `INVOICE_TEMPLATE_DOC_ID` in the script.

## How it runs day to day

1. Client submits the form → row appears in your Bookings sheet, and you get
   an email: **🎨 New booking request** with a big pink **Review booking** button.
2. The review page shows all the details. Type the price and hit **✓ Approve**
   — or click **✗ Decline** (the client gets a polite "not available" email).
3. On approve, automatically:
   - Google Calendar event created (with their phone/email/details inside)
   - Invoice PDF generated with the next invoice number
   - Confirmation email sent to the client with the invoice attached
   - The sheet row updated to APPROVED with a link to the invoice

## Good to know

- Gmail sending limit on a free account is ~100 emails/day — thousands of
  bookings a month before that's a problem.
- Each booking's approval link contains a random secret token, so only someone
  with your email can approve bookings.
- If you ever edit Code.gs later: **Deploy → Manage deployments → ✏ Edit →
  Version: New version → Deploy** (same URL keeps working).
- To test end-to-end: submit a booking through your own site with your email
  as the "client" — you'll see both sides of the flow.
