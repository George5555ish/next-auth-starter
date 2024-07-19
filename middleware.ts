// import { auth } from "@/auth"
import authConfig from '@/auth.config';

import NextAuth, { NextAuthConfig } from 'next-auth';
import {authRoutes,publicRoutes,apiAuthPrefix, DEFAULT_LOGIN_REDIRECT} from "@/routes"
const {auth} = NextAuth(authConfig)
 
export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth;
 const {nextUrl} = req; 
 const isApiAnAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
 const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
 const isAuthRoute = authRoutes.includes(nextUrl.pathname);

 if (isApiAnAuthRoute){ 
 return; 
 }
 if (isAuthRoute){
  if (isLoggedIn){
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
  }
  return; 
 }

 if (!isLoggedIn && !isPublicRoute){
  return Response.redirect(new URL('/auth/login',nextUrl))
 }
 return;
 
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}