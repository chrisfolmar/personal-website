import { MailService } from '@sendgrid/mail';
import { Message } from '@shared/schema';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable is not set. Email notifications will not work.");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

const ADMIN_EMAIL = 'c.folmar@outlook.com';
// Using the verified sender email from SendGrid
const FROM_EMAIL = 'contact@chrisfolmar.com';

export async function sendContactFormEmail(message: Message): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn("Cannot send email: SENDGRID_API_KEY is not set");
      return false;
    }
    
    // Format the email content
    const emailSubject = `Website Contact Form: ${message.subject}`;
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Create the email payload with additional metadata for debugging
    const emailData = {
      to: ADMIN_EMAIL,
      from: {
        email: FROM_EMAIL,
        name: 'Chris Folmar Portfolio'
      },
      subject: emailSubject,
      text: `
New website contact form submission on ${currentDate}

From: ${message.name} (${message.email})
Subject: ${message.subject}

Message:
${message.message}

This message was sent from your portfolio website contact form.
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Contact Form Submission</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; margin: 0; padding: 20px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <tr>
      <td style="padding: 25px 30px; background: linear-gradient(135deg, #4F46E5 0%, #2563EB 100%); text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0; font-size: 14px;">${currentDate}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
              <p style="font-weight: bold; margin: 0; color: #555;">Name:</p>
              <p style="margin: 5px 0 0; font-size: 16px;">${message.name}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
              <p style="font-weight: bold; margin: 0; color: #555;">Email:</p>
              <p style="margin: 5px 0 0; font-size: 16px;"><a href="mailto:${message.email}" style="color: #4F46E5; text-decoration: none;">${message.email}</a></p>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
              <p style="font-weight: bold; margin: 0; color: #555;">Subject:</p>
              <p style="margin: 5px 0 0; font-size: 16px;">${message.subject}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 15px 0;">
              <p style="font-weight: bold; margin: 0 0 10px; color: #555;">Message:</p>
              <div style="background-color: #f5f7fb; padding: 15px; border-radius: 6px; margin-top: 5px; font-size: 16px; line-height: 1.6;">
                ${message.message.replace(/\n/g, '<br>')}
              </div>
            </td>
          </tr>
        </table>
        
        <div style="background-color: #f7f9fc; border-left: 4px solid #4F46E5; padding: 15px; margin-top: 25px; border-radius: 4px;">
          <p style="margin: 0; font-size: 14px; color: #64748b;">You can reply directly to this email to respond to ${message.name}.</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f7f9fc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #eee;">
        <p style="margin: 0;">This is an automated message from your portfolio website contact form.</p>
        <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Chris Folmar</p>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      replyTo: message.email,
      trackingSettings: {
        clickTracking: {
          enable: true
        },
        openTracking: {
          enable: true
        }
      }
    };
    
    // Log the attempt (but not sensitive data)
    console.log(`Attempting to send email notification to ${ADMIN_EMAIL} from ${FROM_EMAIL}`);
    
    await mailService.send(emailData);
    console.log("Email sent successfully");
    
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    // More detailed logging for troubleshooting
    if (error.response) {
      console.error('Error status:', error.code);
      console.error('Error details:', error.response.body);
    }
    return false;
  }
}