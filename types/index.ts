import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export interface IServerActionsResponse {
    message: string;
    success: boolean;
}


export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}