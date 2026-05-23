import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const WHATSAPP_PHONE = '33781822163';
const WHATSAPP_APIKEY = '6164827';

async function sendWhatsApp(message: string) {
  const url = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}&apikey=${WHATSAPP_APIKEY}`;
  await fetch(url);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, address, additionalInfo, bookingDetails } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to owner
    const ownerMail = {
      from: `"Paris Airports Transfers" <${process.env.EMAIL_USER}>`,
      to: 'parislimousinetransfer@gmail.com',
      subject: `🚗 New Booking — ${bookingDetails.departure} → ${bookingDetails.arrival || bookingDetails.duration + 'h'} | ${bookingDetails.date} ${bookingDetails.time}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { box-sizing: border-box; }
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            .header { background-color: #0f0f0f; padding: 30px; text-align: center; border-bottom: 4px solid #D4AF37; }
            .header h1 { color: #D4AF37; margin: 0 0 6px 0; font-size: 22px; text-transform: uppercase; letter-spacing: 3px; }
            .header p { color: #888; margin: 0; font-size: 13px; }
            .alert-banner { background: #D4AF37; padding: 12px 20px; text-align: center; font-weight: bold; font-size: 14px; color: #000; }
            .content { padding: 30px; }
            .section { margin-bottom: 28px; background: #fafafa; border-radius: 8px; padding: 20px; border-left: 4px solid #D4AF37; }
            .section-title { font-size: 13px; font-weight: bold; color: #D4AF37; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
            .label { font-weight: 600; color: #888; }
            .value { color: #111; font-weight: 500; text-align: right; }
            .price-box { background: #0f0f0f; border-radius: 8px; padding: 16px 20px; text-align: center; margin-top: 10px; }
            .price-box .price { font-size: 32px; font-weight: bold; color: #D4AF37; }
            .price-box .price-label { color: #888; font-size: 12px; margin-top: 2px; }
            .route-box { background: #0f0f0f; border-radius: 8px; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
            .route-box .location { color: #fff; font-weight: bold; font-size: 15px; }
            .route-box .arrow { color: #D4AF37; font-size: 20px; }
            .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .contact-item { background: #fff; border: 1px solid #eee; border-radius: 6px; padding: 10px 14px; }
            .contact-item .ci-label { font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 1px; }
            .contact-item .ci-value { font-size: 14px; font-weight: 600; color: #111; margin-top: 2px; }
            .contact-item a { color: #D4AF37; text-decoration: none; }
            .footer { background-color: #0f0f0f; padding: 20px; text-align: center; font-size: 12px; color: #555; }
            .footer a { color: #D4AF37; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Paris Airports Transfers</h1>
              <p>New booking request received</p>
            </div>
            <div class="alert-banner">⚡ Action required — Contact client to confirm booking</div>
            <div class="content">
              <div class="section">
                <div class="section-title">👤 Client Information</div>
                <div class="contact-grid">
                  <div class="contact-item">
                    <div class="ci-label">Full Name</div>
                    <div class="ci-value">${firstName} ${lastName}</div>
                  </div>
                  <div class="contact-item">
                    <div class="ci-label">Phone</div>
                    <div class="ci-value"><a href="tel:${phone}">${phone}</a></div>
                  </div>
                  <div class="contact-item" style="grid-column: span 2;">
                    <div class="ci-label">Email</div>
                    <div class="ci-value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                </div>
              </div>
              <div class="section">
                <div class="section-title">🗺️ Transfer Details</div>
                ${bookingDetails.serviceType === 'distance' ? `
                <div class="route-box">
                  <span class="location">📍 ${bookingDetails.departure}</span>
                  <span class="arrow">→</span>
                  <span class="location">📍 ${bookingDetails.arrival}</span>
                </div>` : `
                <div class="row"><span class="label">Service</span><span class="value">Hourly — ${bookingDetails.duration} hours</span></div>
                <div class="row"><span class="label">Pick Up</span><span class="value">${bookingDetails.departure}</span></div>`}
                <div class="row"><span class="label">Date</span><span class="value"><strong>${bookingDetails.date}</strong></span></div>
                <div class="row"><span class="label">Time</span><span class="value"><strong>${bookingDetails.time}</strong></span></div>
                <div class="row"><span class="label">Passengers</span><span class="value">${bookingDetails.passengers} pax</span></div>
                ${bookingDetails.flightNumber ? `<div class="row"><span class="label">Flight</span><span class="value">✈️ ${bookingDetails.flightNumber}</span></div>` : ''}
                ${address && address !== bookingDetails.departure ? `<div class="row"><span class="label">Pickup Address</span><span class="value">${address}</span></div>` : ''}
              </div>
              <div class="section">
                <div class="section-title">🚗 Vehicle & Price</div>
                <div class="row"><span class="label">Vehicle</span><span class="value">${bookingDetails.vehicle}</span></div>
                <div class="price-box">
                  <div class="price">${bookingDetails.price}€</div>
                  <div class="price-label">Fixed price — all inclusive</div>
                </div>
              </div>
              ${additionalInfo && additionalInfo !== 'Flight: N/A' ? `
              <div class="section">
                <div class="section-title">📝 Additional Notes</div>
                <p style="margin: 0; font-style: italic; color: #555;">${additionalInfo}</p>
              </div>` : ''}
            </div>
            <div class="footer">
              <p>Paris Airports Transfers — <a href="https://www.parisairportstransfers.com">parisairportstransfers.com</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Confirmation email to client
    const clientMail = {
      from: `"Paris Airports Transfers" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ Booking Request Confirmed — ${bookingDetails.departure} → ${bookingDetails.arrival || bookingDetails.duration + 'h'} on ${bookingDetails.date}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { box-sizing: border-box; }
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            .header { background-color: #0f0f0f; padding: 30px; text-align: center; border-bottom: 4px solid #D4AF37; }
            .header h1 { color: #D4AF37; margin: 0 0 6px 0; font-size: 22px; text-transform: uppercase; letter-spacing: 3px; }
            .header p { color: #888; margin: 0; font-size: 13px; }
            .content { padding: 30px; }
            .section { margin-bottom: 24px; background: #fafafa; border-radius: 8px; padding: 20px; border-left: 4px solid #D4AF37; }
            .section-title { font-size: 13px; font-weight: bold; color: #D4AF37; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
            .label { font-weight: 600; color: #888; }
            .value { color: #111; font-weight: 500; text-align: right; }
            .price-box { background: #0f0f0f; border-radius: 8px; padding: 16px 20px; text-align: center; margin-top: 10px; }
            .price-box .price { font-size: 28px; font-weight: bold; color: #D4AF37; }
            .price-box .price-label { color: #888; font-size: 12px; margin-top: 2px; }
            .route-box { background: #0f0f0f; border-radius: 8px; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
            .route-box .location { color: #fff; font-weight: bold; font-size: 14px; }
            .route-box .arrow { color: #D4AF37; font-size: 18px; }
            .whatsapp-btn { display: block; background: #25D366; color: #fff; text-align: center; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px; margin-top: 20px; }
            .footer { background-color: #0f0f0f; padding: 20px; text-align: center; font-size: 12px; color: #555; }
            .footer a { color: #D4AF37; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Paris Airports Transfers</h1>
              <p>Your booking request has been received</p>
            </div>
            <div class="content">
              <p style="font-size: 16px; color: #333;">Dear <strong>${firstName}</strong>,</p>
              <p style="color: #555;">Thank you for choosing Paris Airports Transfers. We have received your request and our team will contact you shortly to confirm your transfer.</p>

              <div class="section">
                <div class="section-title">🗺️ Your Transfer</div>
                ${bookingDetails.serviceType === 'distance' ? `
                <div class="route-box">
                  <span class="location">📍 ${bookingDetails.departure}</span>
                  <span class="arrow">→</span>
                  <span class="location">📍 ${bookingDetails.arrival}</span>
                </div>` : `
                <div class="row"><span class="label">Pick Up</span><span class="value">${bookingDetails.departure}</span></div>`}
                <div class="row"><span class="label">Date</span><span class="value"><strong>${bookingDetails.date}</strong></span></div>
                <div class="row"><span class="label">Time</span><span class="value"><strong>${bookingDetails.time}</strong></span></div>
                <div class="row"><span class="label">Passengers</span><span class="value">${bookingDetails.passengers} pax</span></div>
                <div class="row"><span class="label">Vehicle</span><span class="value">${bookingDetails.vehicle}</span></div>
                ${bookingDetails.flightNumber ? `<div class="row"><span class="label">Flight</span><span class="value">✈️ ${bookingDetails.flightNumber}</span></div>` : ''}
                <div class="price-box">
                  <div class="price">${bookingDetails.price}€</div>
                  <div class="price-label">Fixed price — all tolls included</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">📋 What happens next?</div>
                <p style="margin: 0; color: #555; font-size: 14px;">
                  ✓ Our team will confirm your booking within 30 minutes<br>
                  ✓ You will receive your driver's details 24h before pickup<br>
                  ✓ Your chauffeur will be waiting at arrivals with a name sign
                </p>
              </div>

              <a href="https://wa.me/33781822163?text=Hello%2C%20I%20just%20booked%20a%20transfer%20on%20${bookingDetails.date}" class="whatsapp-btn">
                💬 Contact us on WhatsApp
              </a>
            </div>
            <div class="footer">
              <p>Paris Airports Transfers — <a href="https://www.parisairportstransfers.com">parisairportstransfers.com</a></p>
              <p style="margin-top: 4px;">+33 7 81 82 21 63 | parislimousinetransfer@gmail.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // WhatsApp notification
    const waMessage = `🚗 New Booking!
👤 ${firstName} ${lastName}
📞 ${phone}
📍 ${bookingDetails.departure} → ${bookingDetails.arrival || bookingDetails.duration + 'h'}
📅 ${bookingDetails.date} at ${bookingDetails.time}
🚘 ${bookingDetails.vehicle} — ${bookingDetails.price}€
${bookingDetails.flightNumber ? `✈️ Flight: ${bookingDetails.flightNumber}` : ''}`;

    await Promise.all([
      transporter.sendMail(ownerMail),
      transporter.sendMail(clientMail),
      sendWhatsApp(waMessage),
    ]);

    return NextResponse.json({ message: 'Booking submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
