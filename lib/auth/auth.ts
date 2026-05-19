import { betterAuth } from "better-auth"
import { drizzleAdapter } from "@better-auth/drizzle-adapter"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { sendVerificationEmail, sendPasswordResetEmail } from "@/lib/email"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    sendResetPassword: async ({ user, url }) => {
      void sendPasswordResetEmail(user.email, url)
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void sendVerificationEmail(user.email, url)
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scope: ["openid", "email", "profile"],
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },
  rateLimit: {
    enabled: true,
    window: 600,
    max: 100,
    storage: "database",
    customRules: {
      "/sign-in/social": {
        window: 900,
        max: 5,
      },
      "/sign-in/email": {
        window: 900,
        max: 5,
      },
      "/sign-up/email": {
        window: 3600,
        max: 3,
      },
      "/forget-password": {
        window: 3600,
        max: 3,
      },
      "/send-verification-email": {
        window: 3600,
        max: 3,
      },
    },
  },
  advanced: {
    defaultCookieAttributes: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  },
  account: {
    accountLinking: {
      enabled: false,
    },
  },
})

export type Auth = typeof auth
