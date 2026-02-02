import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, address, additionalInfo, bookingDetails } = body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'parislimousinetransfer@gmail.com', // Target email requested by user
      subject: `New Booking Request - ${bookingDetails.vehicle} - ${bookingDetails.date}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9f9f9; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .header { background-color: #1a1a1a; padding: 30px; text-align: center; border-bottom: 3px solid #D4AF37; }
            .header h1 { color: #D4AF37; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; }
            .content { padding: 30px; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 16px; font-weight: bold; color: #D4AF37; text-transform: uppercase; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .label { font-weight: bold; color: #666; width: 40%; }
            .value { width: 55%; text-align: right; color: #111; font-weight: 500; }
            .footer { background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 12px; color: #888; }
            .highlight { color: #D4AF37; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Booking Request</h1>
            </div>
            
            <div class="content">
              <div class="section">
                <div class="section-title">Client Information</div>
                <div class="row"><span class="label">Name:</span> <span class="value">${firstName} ${lastName}</span></div>
                <div class="row"><span class="label">Email:</span> <span class="value">${email}</span></div>
                <div class="row"><span class="label">Phone:</span> <span class="value">${phone}</span></div>
                <div class="row"><span class="label">Address:</span> <span class="value">${address}</span></div>
              </div>

              <div class="section">
                <div class="section-title">Transfer Details</div>
                <div class="row"><span class="label">Service Type:</span> <span class="value" style="text-transform: capitalize;">${bookingDetails.serviceType}</span></div>
                <div class="row"><span class="label">Date:</span> <span class="value">${bookingDetails.date}</span></div>
                <div class="row"><span class="label">Time:</span> <span class="value">${bookingDetails.time}</span></div>
                <div class="row"><span class="label">Passengers:</span> <span class="value highlight">${bookingDetails.passengers} Pax</span></div>
                
                ${bookingDetails.serviceType === 'distance' ? `
                <div class="row"><span class="label">Pick Up:</span> <span class="value">${bookingDetails.departure}</span></div>
                <div class="row"><span class="label">Drop Off:</span> <span class="value">${bookingDetails.arrival}</span></div>
                ` : `
                <div class="row"><span class="label">Duration:</span> <span class="value">${bookingDetails.duration} Hours</span></div>
                `}
              </div>

              <div class="section">
                <div class="section-title">Vehicle & Price</div>
                <div class="row"><span class="label">Vehicle:</span> <span class="value">${bookingDetails.vehicle}</span></div>
                <div class="row"><span class="label">Total Price:</span> <span class="value" style="font-size: 18px; color: #D4AF37;">${bookingDetails.price}€</span></div>
              </div>

              ${additionalInfo ? `
              <div class="section">
                <div class="section-title">Additional Notes</div>
                <p style="background: #f9f9f9; padding: 10px; border-radius: 4px; font-style: italic;">${additionalInfo}</p>
              </div>
              ` : ''}
            </div>

            <div class="footer">
              <p>This request was sent via Paris Limousine Service.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Booking submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
