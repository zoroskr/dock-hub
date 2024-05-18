import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';
/*
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
 


export async function sendEmail({ to, from, subject, message }) {
  let emailData = {
    from,
    to,
    subject,
    text: message,
  };

  try {
    const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, emailData);
    console.log('Email sent successfully!');
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
*/