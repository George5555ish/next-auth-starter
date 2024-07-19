"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerficationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { IServerActionsResponse } from "@/types";
import { AuthError } from "next-auth";
import * as z from "zod";
export const login = async (
  values: z.infer<typeof LoginSchema>
): Promise<IServerActionsResponse> => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      message: "Invalid Fields!",
      success: false,
    };
  }
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {message: 'Invalid Credentials', success: false}
  }
  if (!existingUser.emailVerified){
    const verificationToken = await generateVerficationToken(email)
    sendVerificationEmail(verificationToken.email, verificationToken.token)
    return {message: 'Confirmation Email Sent! Please Verify your email.', success: true}
  }
  try {
    return signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
     
    //    return {message: "Sign In successful!",success: true}
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      console.log("ERROR TYPE:==================>>>> " + error?.type);
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials", success: false };
        default:
          return { message: "Something went wrong!", success: false };
      }
    }

    console.log("ERROR TYPE:==================>>>> " + error);
    return { message: "Something went wrong!asfwe", success: false };
  }
};
