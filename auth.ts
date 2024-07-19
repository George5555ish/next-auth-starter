import NextAuth , {DefaultSession} from "next-auth";
// import GitHub from "next-auth/providers/github"
// import Google from "next-auth/providers/google"
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  //   providers: [GitHub, Google],
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({user}){
        await db.user.update({
            where: {id: user.id},
            data: {emailVerified: new Date()}
        })
    }
  },
  callbacks: {

    async signIn({user,account}){
        if (account?.provider !== "credentials") return true;

        const existingUser = await getUserById(user.id as string);
        if (!existingUser?.emailVerified) return false; /// prevent sign in if not verified.
        return true;

    },
    async session({ session, token }) {
      console.log({ sessionToken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      console.log({ token });
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
});
