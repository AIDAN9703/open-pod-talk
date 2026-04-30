import { Resend } from "resend";

let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) return null;
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendSubmissionNotification(data: {
  name: string;
  email: string;
  topic: string;
}) {
  const client = getResend();
  if (!client) return;

  await client.emails.send({
    from: process.env.EMAIL_FROM ?? "noreply@openpodtalk.com",
    to: process.env.HOST_EMAIL ?? "host@openpodtalk.com",
    subject: `New caller submission: ${data.topic}`,
    html: `
      <h2>New Caller Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Topic:</strong> ${data.topic}</p>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://openpodtalk.com"}/admin">Review in dashboard →</a></p>
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
    from: process.env.EMAIL_FROM ?? "noreply@openpodtalk.com",
    to: data.to,
    subject: "We received your OpenPodTalk submission",
    html: `
      <h2>Thanks, ${data.name}!</h2>
      <p>We've received your submission about: <strong>${data.topic}</strong></p>
      <p>If selected, we'll reach out with a Riverside guest link and tech-check time at least 48 hours before the episode.</p>
      <p>By submitting, you confirmed your acceptance of the <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://openpodtalk.com"}/privacy">OpenPodTalk Caller Release</a>.</p>
      <p>— The OpenPodTalk team</p>
    `,
  });
}

export async function sendMagicLinkEmail(to: string, magicLink: string) {
  const client = getResend();
  if (!client) return;

  await client.emails.send({
    from: process.env.EMAIL_FROM ?? "noreply@openpodtalk.com",
    to,
    subject: "Your OpenPodTalk sign-in link",
    html: `
      <p>Click the link below to sign in to the OpenPodTalk dashboard. This link expires in 1 hour.</p>
      <p><a href="${magicLink}">Sign in →</a></p>
    `,
  });
}
