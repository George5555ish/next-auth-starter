"use server"
import bcrypt from "bcryptjs";
import {  RegisterSchema } from "@/schemas"
import { IServerActionsResponse } from "@/types";
import {db} from "@/lib/db"
import * as z from "zod"
import { getUserByEmail } from "@/data/user";
import { generateVerficationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
export const register = async (values:  z.infer<typeof RegisterSchema>): Promise<IServerActionsResponse> => {
   const validatedFields = RegisterSchema.safeParse(values);
   if (!validatedFields.success){
    return {
        message: "Invalid Fields!",
        success: false 
    }
   }

   const {email,password,name} = validatedFields.data;
   const hashedPassword = await bcrypt.hash(password, 10);
   const existingUser = await getUserByEmail(email)
   if (existingUser){
    return {success: false, message: 'Email already exists'}
   }

   await db.user.create({
    data: {
        name,email,password: hashedPassword
    }
   });

   /// send verification token email
   const verificationToken = await generateVerficationToken(email)
   sendVerificationEmail(verificationToken.email, verificationToken.token)
   return {message: "Confirmation Email sent!",success: true}
}