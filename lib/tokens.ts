import { getVerificationTokenFromEmail } from "@/data/verification-token";
import {v4 as uuidv4} from "uuid";
import { db } from "./db";
export const generateVerficationToken = async (email: string) => {
const token = uuidv4();
const expires = new Date(new Date().getTime() + 3500 * 1000);

const existingToken = await getVerificationTokenFromEmail(email);
if (existingToken){
    await db.verificationToken.delete({
        where: {id:existingToken.id}
    })
}

const newToken = await db.verificationToken.create({
    data: {
        email,
        token,
        expires
    }
});
return newToken;
}