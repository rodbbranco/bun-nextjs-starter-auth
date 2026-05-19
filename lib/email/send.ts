import { resend, fromEmail } from "./client"

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string
): Promise<void> {
  await resend.emails.send({
    from: fromEmail,
    to,
    subject,
    html,
    text,
  })
}
