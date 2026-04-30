import { Resend } from "resend";

let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) return null;
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

/** Prevent HTML injection from user-provided strings in email templates. */
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const siteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://openpodtalk.com";

const fromAddress = () =>
  process.env.EMAIL_FROM ?? "noreply@openpodtalk.com";

export async function sendSubmissionNotification(data: {
  name: string;
  email: string;
  topic: string;
}) {
  const client = getResend();
  if (!client) return;

  await client.emails.send({
    from: fromAddress(),
    to: process.env.HOST_EMAIL ?? "host@openpodtalk.com",
    subject: `New caller submission: ${esc(data.topic)}`,
    html: `
      <h2>New Caller Submission</h2>
      <p><strong>Name:</strong> ${esc(data.name)}</p>
      <p><strong>Email:</strong> ${esc(data.email)}</p>
      <p><strong>Topic:</strong> ${esc(data.topic)}</p>
      <p><a href="${esc(siteUrl())}/admin">Review in dashboard →</a></p>
    `,
  });
}

export async function sendConfirmationEmail(data: {
  to: string;
  name: string;
  topic: string;
}) {
  const client = getResend();
  if (!client) return;

  await client.emails.send({
    from: fromAddress(),
    to: data.to,
    subject: "We received your Open Pod Talk submission",
    html: `
      <h2>Thanks, ${esc(data.name)}!</h2>
      <p>We've received your submission about: <strong>${esc(data.topic)}</strong></p>
      <p>If selected, we'll reach out with a Riverside guest link and tech-check time at least 48 hours before the episode.</p>
      <p>By submitting, you confirmed your acceptance of the
        <a href="${esc(siteUrl())}/privacy">Open Pod Talk Caller Release</a>.
      </p>
      <p>— The Open Pod Talk team</p>
    `,
  });
}

export async function sendMagicLinkEmail(to: string, magicLink: string) {
  const client = getResend();
  if (!client) return;

  await client.emails.send({
    from: fromAddress(),
    to,
    subject: "Your Open Pod Talk sign-in link",
    html: `
      <p>Click the link below to sign in to the Open Pod Talk dashboard. This link expires in 1 hour.</p>
      <p><a href="${esc(magicLink)}">Sign in →</a></p>
    `,
  });
}
