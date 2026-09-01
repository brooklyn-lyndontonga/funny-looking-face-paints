/**
 * FUNNY LOOKING FACE PAINTS — free booking automation
 * ---------------------------------------------------
 * Flow: website form → this web app → approval email to you →
 *       you review & set price → Google Calendar event +
 *       invoice PDF + confirmation email to client.
 *
 * Setup steps are in SETUP.md (short version):
 *   1. Create a Google Sheet, open Extensions → Apps Script, paste this file.
 *   2. Fill in CONFIG below.
 *   3. Deploy → New deployment → Web app → Execute as: Me,
 *      Who has access: Anyone. Copy the /exec URL.
 *   4. Paste that URL into WEBHOOK_URL in BookingForm.js on your site.
 */

const CONFIG = {
  BUSINESS_NAME: "Funny Looking Face Paints",
  YOUR_EMAIL: "funnylooking4010@gmail.com", // where approval requests go
  CALENDAR_ID: "primary",                    // or a specific calendar's ID
  // Optional: a Google Doc invoice template with {{Placeholders}}.
  // Leave empty ("") and a clean invoice is generated automatically.
  INVOICE_TEMPLATE_DOC_ID: "",
  BANK_ACCOUNT: "00-0000-0000000-00",        // shown on the invoice
  INVOICE_START_NUMBER: 1001,
  TIMEZONE: "Pacific/Auckland",
};

const SHEET_NAME = "Bookings";
const COLS = ["ID","Token","Status","Submitted","Name","Phone","Email","Date","Start","End","Location","Message","Price","Invoice #","Invoice Link"];

/* ───────────────────────── INTAKE (form posts here) ───────────────────────── */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot: silently accept but ignore bot submissions
    if (data._honey) return jsonOut({ ok: true });

    const id = Utilities.getUuid();
    const token = Utilities.getUuid().replace(/-/g, "");
    const sheet = getSheet();
    sheet.appendRow([
      id, token, "PENDING", new Date(),
      data.name || "", data.phone || "", data.email || "",
      data.date || "", data["start-time"] || "", data["end-time"] || "",
      data.location || "", data.message || "", "", "", ""
    ]);

    sendApprovalEmail(id, token, data);
    return jsonOut({ ok: true });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function sendApprovalEmail(id, token, d) {
  const url = ScriptApp.getService().getUrl();
  const reviewLink = `${url}?action=review&id=${id}&token=${token}`;
  const niceDate = formatDateNice(d.date);

  MailApp.sendEmail({
    to: CONFIG.YOUR_EMAIL,
    subject: `🎨 New booking request — ${d.name}, ${niceDate}`,
    htmlBody: `
      <div style="font-family:Arial,sans-serif;max-width:520px">
        <h2 style="color:#e91e8c">New booking request</h2>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><b>Name</b></td><td>${esc(d.name)}</td></tr>
          <tr><td><b>Phone</b></td><td>${esc(d.phone)}</td></tr>
          <tr><td><b>Email</b></td><td>${esc(d.email)}</td></tr>
          <tr><td><b>Date</b></td><td>${niceDate}</td></tr>
          <tr><td><b>Time</b></td><td>${esc(d["start-time"])} – ${esc(d["end-time"])}</td></tr>
          <tr><td><b>Location</b></td><td>${esc(d.location)}</td></tr>
          <tr><td><b>Event</b></td><td>${esc(d.message)}</td></tr>
        </table>
        <p style="margin-top:24px">
          <a href="${reviewLink}" style="background:#e91e8c;color:#fff;padding:12px 24px;
             border-radius:6px;text-decoration:none;font-weight:bold">Review booking →</a>
        </p>
        <p style="color:#888;font-size:12px">Approve or decline from the review page. Approving asks you for the price, then creates the calendar event, invoice and client email automatically.</p>
      </div>`
  });
}

/* ───────────────────── REVIEW / APPROVE / DECLINE pages ───────────────────── */

function doGet(e) {
  const p = e.parameter || {};
  const row = findRow(p.id);
  if (!row || row.token !== p.token) return page("Not found", "<p>This booking link isn't valid.</p>");

  if (p.action === "review")  return reviewPage(row);
  if (p.action === "approve") return approve(row, p.price);
  if (p.action === "decline") return decline(row);
  return page("Hmm", "<p>Unknown action.</p>");
}

function reviewPage(r) {
  if (r.status !== "PENDING")
    return page("Already handled", `<p>This booking was already <b>${r.status.toLowerCase()}</b>.</p>`);

  const url = ScriptApp.getService().getUrl();
  return page(`Booking — ${esc(r.name)}`, `
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><td><b>Name</b></td><td>${esc(r.name)}</td></tr>
      <tr><td><b>Phone</b></td><td>${esc(r.phone)}</td></tr>
      <tr><td><b>Email</b></td><td>${esc(r.email)}</td></tr>
      <tr><td><b>Date</b></td><td>${formatDateNice(r.date)}</td></tr>
      <tr><td><b>Time</b></td><td>${esc(r.start)} – ${esc(r.end)}</td></tr>
      <tr><td><b>Location</b></td><td>${esc(r.location)}</td></tr>
      <tr><td><b>Event</b></td><td>${esc(r.message)}</td></tr>
    </table>
    <form action="${url}" method="get" style="margin-top:24px">
      <input type="hidden" name="action" value="approve">
      <input type="hidden" name="id" value="${r.id}">
      <input type="hidden" name="token" value="${r.token}">
      <label style="font-weight:bold">Price (NZD): </label>
      <input type="number" name="price" min="0" step="0.01" required
             style="padding:8px;width:110px;border:1px solid #ccc;border-radius:4px">
      <button type="submit" style="background:#2e7d32;color:#fff;border:0;padding:10px 22px;
              border-radius:6px;font-weight:bold;margin-left:8px;cursor:pointer">✓ Approve</button>
    </form>
    <p style="margin-top:16px">
      <a href="${url}?action=decline&id=${r.id}&token=${r.token}"
         style="color:#c62828">✗ Decline this booking</a>
    </p>`);
}

function approve(r, price) {
  if (r.status !== "PENDING")
    return page("Already handled", `<p>This booking was already <b>${r.status.toLowerCase()}</b>.</p>`);
  price = Number(price || 0);

  // 1. Calendar event
  const start = toDate(r.date, r.start);
  const end = toDate(r.date, r.end);
  CalendarApp.getCalendarById(CONFIG.CALENDAR_ID).createEvent(
    `🎨 Face painting — ${r.name}`, start, end, {
      location: r.location,
      description: `Client: ${r.name}\nPhone: ${r.phone}\nEmail: ${r.email}\nPrice: $${price.toFixed(2)}\n\nEvent details:\n${r.message}`
    });

  // 2. Invoice PDF
  const invNo = nextInvoiceNumber();
  const inv = buildInvoice(r, price, invNo);

  // 3. Confirmation email to client, invoice attached
  MailApp.sendEmail({
    to: r.email,
    subject: `Booking confirmed! 🎉 ${CONFIG.BUSINESS_NAME} — ${formatDateNice(r.date)}`,
    htmlBody: `
      <div style="font-family:Arial,sans-serif;max-width:520px">
        <h2 style="color:#e91e8c">You're booked in! 🎨</h2>
        <p>Hi ${esc(r.name)},</p>
        <p>Great news — your face painting booking is confirmed:</p>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><b>Date</b></td><td>${formatDateNice(r.date)}</td></tr>
          <tr><td><b>Time</b></td><td>${esc(r.start)} – ${esc(r.end)}</td></tr>
          <tr><td><b>Location</b></td><td>${esc(r.location)}</td></tr>
          <tr><td><b>Price</b></td><td>$${price.toFixed(2)} NZD</td></tr>
        </table>
        <p>Your invoice is attached. Payment details are on the invoice.</p>
        <p>Can't wait to see you! If anything changes, just reply to this email.</p>
        <p>— ${CONFIG.BUSINESS_NAME}</p>
      </div>`,
    attachments: [inv.pdf]
  });

  updateRow(r.rowIndex, { Status: "APPROVED", Price: price, "Invoice #": invNo, "Invoice Link": inv.link });
  return page("Approved ✓", `<p><b>${esc(r.name)}</b> is booked for ${formatDateNice(r.date)}.</p>
    <p>Calendar event created, invoice #${invNo} sent to ${esc(r.email)}.</p>
    <p><a href="${inv.link}">View invoice</a></p>`);
}

function decline(r) {
  if (r.status !== "PENDING")
    return page("Already handled", `<p>This booking was already <b>${r.status.toLowerCase()}</b>.</p>`);

  MailApp.sendEmail({
    to: r.email,
    subject: `About your booking request — ${CONFIG.BUSINESS_NAME}`,
    htmlBody: `
      <div style="font-family:Arial,sans-serif;max-width:520px">
        <p>Hi ${esc(r.name)},</p>
        <p>Thanks so much for your booking request for ${formatDateNice(r.date)}. Unfortunately I'm not available at that time.</p>
        <p>If you have flexibility on the date or time, I'd love to make it work — just reply to this email or pop another request through the website.</p>
        <p>— ${CONFIG.BUSINESS_NAME}</p>
      </div>`
  });

  updateRow(r.rowIndex, { Status: "DECLINED" });
  return page("Declined", `<p>The booking was declined and ${esc(r.name)} has been notified politely.</p>`);
}

/* ───────────────────────────── INVOICE BUILDING ───────────────────────────── */

function buildInvoice(r, price, invNo) {
  let doc;
  const name = `Invoice ${invNo} — ${r.name}`;
  const today = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "d MMM yyyy");

  if (CONFIG.INVOICE_TEMPLATE_DOC_ID) {
    const copy = DriveApp.getFileById(CONFIG.INVOICE_TEMPLATE_DOC_ID).makeCopy(name);
    doc = DocumentApp.openById(copy.getId());
    const b = doc.getBody();
    const reps = {
      "{{InvoiceNumber}}": String(invNo), "{{InvoiceDate}}": today,
      "{{ClientName}}": r.name, "{{ClientEmail}}": r.email, "{{ClientPhone}}": r.phone,
      "{{EventDate}}": formatDateNice(r.date), "{{EventTime}}": `${r.start} – ${r.end}`,
      "{{Location}}": r.location, "{{Amount}}": price.toFixed(2),
      "{{BankAccount}}": CONFIG.BANK_ACCOUNT,
    };
    for (const k in reps) b.replaceText(escRegex(k), reps[k]);
  } else {
    doc = DocumentApp.create(name);
    const b = doc.getBody();
    b.appendParagraph(CONFIG.BUSINESS_NAME).setHeading(DocumentApp.ParagraphHeading.HEADING1);
    b.appendParagraph(`INVOICE #${invNo}`).setHeading(DocumentApp.ParagraphHeading.HEADING2);
    b.appendParagraph(`Date: ${today}`);
    b.appendParagraph("");
    b.appendParagraph(`Billed to: ${r.name}`);
    b.appendParagraph(`${r.email} · ${r.phone}`);
    b.appendParagraph("");
    const t = b.appendTable([
      ["Description", "Amount"],
      [`Face painting — ${formatDateNice(r.date)}, ${r.start}–${r.end}\n${r.location}`, `$${price.toFixed(2)}`],
      ["TOTAL DUE", `$${price.toFixed(2)} NZD`],
    ]);
    t.getRow(0).editAsText().setBold(true);
    t.getRow(2).editAsText().setBold(true);
    b.appendParagraph("");
    b.appendParagraph(`Payment by bank transfer to: ${CONFIG.BANK_ACCOUNT}`);
    b.appendParagraph(`Reference: INV${invNo}`);
    b.appendParagraph("");
    b.appendParagraph("Thank you! 🎨").setItalic(true);
  }

  doc.saveAndClose();
  const file = DriveApp.getFileById(doc.getId());
  return { pdf: file.getAs("application/pdf").setName(`${name}.pdf`), link: file.getUrl() };
}

function nextInvoiceNumber() {
  const props = PropertiesService.getScriptProperties();
  const n = Number(props.getProperty("invoiceNo") || CONFIG.INVOICE_START_NUMBER);
  props.setProperty("invoiceNo", String(n + 1));
  return n;
}

/* ─────────────────────────────── UTILITIES ────────────────────────────────── */

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) { sh = ss.insertSheet(SHEET_NAME); sh.appendRow(COLS); sh.setFrozenRows(1); }
  return sh;
}

function findRow(id) {
  if (!id) return null;
  const sh = getSheet();
  const vals = sh.getDataRange().getValues();
  for (let i = 1; i < vals.length; i++) {
    if (vals[i][0] === id) {
      const [ID, token, status, submitted, name, phone, email, date, start, end, location, message] = vals[i];
      return { id: ID, token, status, name, phone, email,
               date: asDateString(date), start: asTimeString(start), end: asTimeString(end),
               location, message, rowIndex: i + 1 };
    }
  }
  return null;
}

function updateRow(rowIndex, updates) {
  const sh = getSheet();
  for (const key in updates) {
    const col = COLS.indexOf(key) + 1;
    if (col > 0) sh.getRange(rowIndex, col).setValue(updates[key]);
  }
}

function toDate(dateStr, timeStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [h, min] = timeStr.split(":").map(Number);
  return new Date(y, m - 1, d, h, min);
}

function asDateString(v) {
  if (v instanceof Date) return Utilities.formatDate(v, CONFIG.TIMEZONE, "yyyy-MM-dd");
  return String(v);
}
function asTimeString(v) {
  if (v instanceof Date) return Utilities.formatDate(v, CONFIG.TIMEZONE, "HH:mm");
  return String(v);
}
function formatDateNice(dateStr) {
  try { const [y, m, d] = String(dateStr).split("-").map(Number);
        return Utilities.formatDate(new Date(y, m - 1, d), CONFIG.TIMEZONE, "EEEE d MMMM yyyy"); }
  catch (e) { return String(dateStr); }
}

function esc(s) {
  return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function escRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function page(title, bodyHtml) {
  return HtmlService.createHtmlOutput(`
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:40px auto;padding:0 20px">
      <h2 style="color:#e91e8c">${title}</h2>
      ${bodyHtml}
    </div>`).setTitle(title);
}
