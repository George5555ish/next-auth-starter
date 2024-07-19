"use server";

import {
  getVerificationTokenFromEmail,
  getVerificationTokenFromToken,
} from "@/data/verification-token";
import { db } from "@/lib/db";
import { IServerActionsResponse } from "@/types";

export const newVerification = async (
  token: string
): Promise<IServerActionsResponse> => {
  const existingToken = await getVerificationTokenFromToken(token);

  if (!existingToken) {
    return { message: "Token does not exist", success: false };
  }

  const hasExpired = new Date(existingToken?.expires) < new Date();

  if (hasExpired) {
    return { message: "Token expired", success: false };
  }
  const existingUserVerificationPayload = await getVerificationTokenFromEmail(existingToken.email);

  if (!existingUserVerificationPayload) {
    return { message: "Email does not exist", success: false };
  }

  console.log(existingUserVerificationPayload)
  const testUser = await db.user.findFirst({
    where: {email: existingUserVerificationPayload.email} 
  });
  if (!testUser) {
    return { message: "Email does not exist", success: false };
  }
  await db.user.update({
    where: {id: testUser.id},
    data: {
        emailVerified: new Date(),
        email: existingToken.email
    }
  });
  await db.verificationToken.delete({
    where: {id: existingUserVerificationPayload.id}
  });

  return { message: "Verification successful", success: true };
};
