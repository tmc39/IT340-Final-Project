const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5001;

app.use(bodyParser.json());

// Configure email transporter with Ethereal Email
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'your-ethereal-email@ethereal.email',    // REPLACE THIS
    pass: 'your-ethereal-password'                  // REPLACE THIS
  }
});

// Send 2FA Code for Login
app.post('/email/2fa-code', async (req, res) => {
  try {
    const { to, userName, code } = req.body;

    const mailOptions = {
      from: 'EventLink <noreply@eventlink.com>',
      to: to,
      subject: 'Your EventLink Login Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">EventLink Login Verification</h2>
          <p>Hi ${userName},</p>
          <p>Your two-factor authentication code is:</p>
          <div style="background-color: #F3F4F6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 10px;">
            <h1 style="color: #3B82F6; letter-spacing: 8px; margin: 0; font-size: 36px;">${code}</h1>
          </div>
          <p><strong>This code will expire in 10 minutes.</strong></p>
          <p>If you didn't request this code, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
          <p style="color: #6B7280; font-size: 12px;">EventLink - Connecting students with campus events</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('2FA code sent to:', to);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    
    res.json({ 
      success: true, 
      message: '2FA code sent',
      previewUrl: nodemailer.getTestMessageUrl(info)
    });

  } catch (error) {
    console.error('Error sending 2FA email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send RSVP Confirmation Email
app.post('/email/rsvp-confirmation', async (req, res) => {
  try {
    const { to, userName, eventTitle, eventDate, eventTime, eventLocation } = req.body;

    const mailOptions = {
      from: 'EventLink <noreply@eventlink.com>',
      to: to,
      subject: `RSVP Confirmation - ${eventTitle}`,
      html: `
        <h2>RSVP Confirmation</h2>
        <p>Hi ${userName},</p>
        <p>You have successfully RSVP'd to:</p>
        <h3>${eventTitle}</h3>
        <p><strong>Date:</strong> ${eventDate}</p>
        <p><strong>Time:</strong> ${eventTime}</p>
        <p><strong>Location:</strong> ${eventLocation}</p>
        <p>We look forward to seeing you there!</p>
        <p>Best regards,<br>EventLink Team</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('RSVP confirmation email sent to:', to);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    
    res.json({ success: true, message: 'RSVP confirmation sent' });

  } catch (error) {
    console.error('Error sending RSVP email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Email service is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`📧 EventLink Email Service running on http://192.168.56.104:${PORT}`);
});

