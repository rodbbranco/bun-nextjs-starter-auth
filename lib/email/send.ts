import { resend, fromEmail } from "./client"

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string
): Promise<void> {
  if (!resend) {
    console.warn("Resend API key not configured. Email not sent.")
    return
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
      text,
    })
  } catch (error) {
    console.error("Failed to send email:", error)
    throw error
  }
}
