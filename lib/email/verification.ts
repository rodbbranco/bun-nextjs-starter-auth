import { sendEmail } from "./send"

export async function sendVerificationEmail(email: string, url: string) {
  await sendEmail(
    email,
    "Verify your email address",
    `
      <p>Click the button below to verify your email address.</p>
      <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 4px;">Verify email</a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p>${url}</p>
    `,
    `Click the link to verify your email: ${url}`
  )
}
