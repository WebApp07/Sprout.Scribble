"use server";

import { eq } from "drizzle-orm";
import { emailTokens } from "../schema";
import { db } from "..";

export const getVerificationTokenEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.emailTokens.findFirst({
      where: eq(emailTokens.token, email),
    });
  } catch (error) {
    return { error: null };
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenEmail(email);

  if (existingToken) {
    await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
  }

  const verificationToken = await db.insert(emailTokens).values({
    email,
    token,
    expires,
  });
  return verificationToken;
};
