import { db } from "@/lib/db";

export const getVerificationTokenFromEmail = async (email: string) => {

    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: {email}
        });
        return verificationToken;
    } catch (error) {
        return null
    }
}

export const getVerificationTokenFromToken = async (token: string) => {

    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: {token}
        });
        return verificationToken;
    } catch (error) {
        return null
    }
}