"use server";

import { RegisterSchema } from "@/types/register-schema";
import { createSafeActionClient } from "next-safe-action";
import bcrypt from "bcrypt";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";

const action = createSafeActionClient();

export const emailRegister = action(
  RegisterSchema,
  async ({ email, name, password }) => {
    // We are hasing our password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check existing user
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        await sendVerificationEmail();

        return { success: "Email Confirmation resent" };
      }
      return { error: "Email already in use" };
    }

    // Login for when the user is not registered
    await db.insert(users).values({
      email,
      name,
    });

    const verificationToken = await generateEmailVerificationToken(email);

    await sendVerificationEmail();

    return { success: "Confirmation mail send!" };
  }
);
