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
            to: 'icipsg93@gmail.com', // Target email requested by user
            subject: `New Booking Request - ${bookingDetails.vehicle} - ${bookingDetails.date}`,
            html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #D4AF37;">New Booking Request</h2>
          <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}</p>
          
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          
          <h3 style="color: #333;">Booking Details</h3>
          <p><strong>Service:</strong> ${bookingDetails.serviceType}</p>
          <p><strong>Vehicle:</strong> ${bookingDetails.vehicle}</p>
          <p><strong>Date:</strong> ${bookingDetails.date}</p>
          <p><strong>Time:</strong> ${bookingDetails.time}</p>
          ${bookingDetails.serviceType === 'distance' ? `
            <p><strong>From:</strong> ${bookingDetails.departure}</p>
            <p><strong>To:</strong> ${bookingDetails.arrival}</p>
          ` : `
            <p><strong>Duration:</strong> ${bookingDetails.duration} Hours</p>
          `}
          <p><strong>Price:</strong> ${bookingDetails.price}€</p>
          
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          
          <p><strong>Additional Info:</strong></p>
          <p>${additionalInfo || 'None'}</p>
        </div>
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
