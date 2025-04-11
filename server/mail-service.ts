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
// Using admin email as FROM as well since it needs to be verified with SendGrid
const FROM_EMAIL = 'c.folmar@outlook.com';

export interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendContactFormEmail(message: Message): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn("Cannot send email: SENDGRID_API_KEY is not set");
      return false;
    }
    
    // Format the email content
    const emailSubject = `Website Contact Form: ${message.subject}`;
    const emailText = `
      New message from your website contact form:
      
      Name: ${message.name}
      Email: ${message.email}
      Subject: ${message.subject}
      
      Message:
      ${message.message}
      
      This message was sent from your portfolio website contact form.
    `;
    
    const emailHtml = `
      <h2>New message from your website contact form</h2>
      <p><strong>Name:</strong> ${message.name}</p>
      <p><strong>Email:</strong> ${message.email}</p>
      <p><strong>Subject:</strong> ${message.subject}</p>
      
      <h3>Message:</h3>
      <p>${message.message.replace(/\n/g, '<br>')}</p>
      
      <hr>
      <p><small>This message was sent from your portfolio website contact form.</small></p>
    `;
    
    await mailService.send({
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      replyTo: message.email,
    });
    
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}