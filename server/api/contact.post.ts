import nodemailer from 'nodemailer';

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asCleanString(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim().replace(/[\r\n]+/g, ' ');
  if (!trimmed || trimmed.length > maxLength) return null;
  return trimmed;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate and sanitize inputs
  const name = asCleanString(body?.name, MAX_LENGTHS.name);
  const email = asCleanString(body?.email, MAX_LENGTHS.email);
  const subject = asCleanString(body?.subject, MAX_LENGTHS.subject);
  const message =
    typeof body?.message === 'string' ? body.message.trim().slice(0, MAX_LENGTHS.message) : '';

  if (!name || !email || !subject || !message || !EMAIL_RE.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please provide a valid name, email, subject, and message.',
    });
  }

  // Check if SMTP credentials are provided (default to Mailpit)
  const config = useRuntimeConfig();
  const host = config.smtpHost || process.env.SMTP_HOST || '192.168.100.3';
  const port = Number(config.smtpPort || process.env.SMTP_PORT || 1025);
  const user = config.smtpUser || process.env.SMTP_USER;
  const pass = config.smtpPass || process.env.SMTP_PASS;

  try {
    const authConfig = user && pass ? { user, pass } : undefined;

    // Create reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: port === 465, // true for 465, false for other ports
      auth: authConfig,
      // Only skip TLS for local catchers (e.g. Mailpit) without auth
      ignoreTLS: !authConfig,
    });

    // Setup email data (user content is HTML-escaped)
    const safeHtmlMessage = escapeHtml(message).replace(/\n/g, '<br>');
    const mailOptions = {
      from: { name, address: 'noreply@octopy.dev' }, // Sender address
      replyTo: { name, address: email },
      to: 'supianidz@octopy.dev', // Receiver
      subject: `[Portfolio Contact] ${subject}`, // Subject line
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // Plain text body
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr>
        <p>${safeHtmlMessage}</p>
      `,
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return { success: true, message: 'Message sent successfully.' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send email. Please try again later.',
    });
  }
});
