// RSVP Confirmation Email
app.post('/email/rsvp-confirmation', async (req, res) => {
  const { email, userName, eventTitle, eventDate, eventTime, eventLocation } = req.body;

  try {
    const info = await transporter.sendMail({
      from: '"EventLink" <noreply@eventlink.com>',
      to: email,
      subject: `RSVP Confirmed: ${eventTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
            .event-details h3 { margin-top: 0; color: #667eea; }
            .detail-row { margin: 10px 0; }
            .label { font-weight: bold; color: #4B5563; }
            .footer { text-align: center; color: #6B7280; font-size: 12px; margin-top: 20px; }
            .checkmark { font-size: 48px; color: #10B981; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="checkmark">✓</div>
              <h1 style="margin: 10px 0;">RSVP Confirmed!</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${userName}</strong>,</p>
              <p>You've successfully RSVP'd to the following event:</p>
              
              <div class="event-details">
                <h3>${eventTitle}</h3>
                <div class="detail-row">
                  <span class="label">📅 Date:</span> ${eventDate}
                </div>
                <div class="detail-row">
                  <span class="label">🕐 Time:</span> ${eventTime}
                </div>
                <div class="detail-row">
                  <span class="label">📍 Location:</span> ${eventLocation}
                </div>
              </div>

              <p>We'll send you a reminder before the event starts!</p>
              <p>If you need to cancel, you can do so from your dashboard.</p>
              
              <div class="footer">
                <p>This is an automated message from EventLink.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log('RSVP confirmation sent to:', email);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending RSVP confirmation:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Event Reminder Email
app.post('/email/event-reminder', async (req, res) => {
  const { email, userName, eventTitle, eventDate, eventTime, eventLocation, hoursUntil } = req.body;

  try {
    const info = await transporter.sendMail({
      from: '"EventLink" <noreply@eventlink.com>',
      to: email,
      subject: `Reminder: ${eventTitle} starts soon!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
            .event-details h3 { margin-top: 0; color: #f59e0b; }
            .detail-row { margin: 10px 0; }
            .label { font-weight: bold; color: #4B5563; }
            .footer { text-align: center; color: #6B7280; font-size: 12px; margin-top: 20px; }
            .alarm { font-size: 48px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="alarm">⏰</div>
              <h1 style="margin: 10px 0;">Event Reminder</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${userName}</strong>,</p>
              <p>This is a friendly reminder that your event is coming up in <strong>${hoursUntil} hours</strong>!</p>
              
              <div class="event-details">
                <h3>${eventTitle}</h3>
                <div class="detail-row">
                  <span class="label">📅 Date:</span> ${eventDate}
                </div>
                <div class="detail-row">
                  <span class="label">🕐 Time:</span> ${eventTime}
                </div>
                <div class="detail-row">
                  <span class="label">📍 Location:</span> ${eventLocation}
                </div>
              </div>

              <p>We look forward to seeing you there!</p>
              
              <div class="footer">
                <p>This is an automated message from EventLink.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log('Event reminder sent to:', email);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending event reminder:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// RSVP Cancellation Email
app.post('/email/rsvp-cancellation', async (req, res) => {
  const { email, userName, eventTitle, eventDate, eventTime } = req.body;

  try {
    const info = await transporter.sendMail({
      from: '"EventLink" <noreply@eventlink.com>',
      to: email,
      subject: `RSVP Cancelled: ${eventTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6B7280; }
            .event-details h3 { margin-top: 0; color: #6B7280; }
            .detail-row { margin: 10px 0; }
            .label { font-weight: bold; color: #4B5563; }
            .footer { text-align: center; color: #6B7280; font-size: 12px; margin-top: 20px; }
            .icon { font-size: 48px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="icon">✕</div>
              <h1 style="margin: 10px 0;">RSVP Cancelled</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${userName}</strong>,</p>
              <p>You've successfully cancelled your RSVP for:</p>
              
              <div class="event-details">
                <h3>${eventTitle}</h3>
                <div class="detail-row">
                  <span class="label">📅 Date:</span> ${eventDate}
                </div>
                <div class="detail-row">
                  <span class="label">🕐 Time:</span> ${eventTime}
                </div>
              </div>

              <p>You can always RSVP again from the events page if you change your mind!</p>
              
              <div class="footer">
                <p>This is an automated message from EventLink.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log('RSVP cancellation sent to:', email);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

