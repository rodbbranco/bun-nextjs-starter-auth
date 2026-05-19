import { sendEmail } from "./send"

export async function sendPasswordResetEmail(email: string, url: string) {
  await sendEmail(
    email,
    "Reset your password",
    `
      <p>Click the button below to reset your password. This link expires in 1 hour.</p>
      <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 4px;">Reset password</a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p>${url}</p>
    `,
    `Click the link to reset your password: ${url}`
  )
}
