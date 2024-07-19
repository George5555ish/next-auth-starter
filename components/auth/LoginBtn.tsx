"use client"
import React from 'react'

import { useRouter } from "next/navigation";

interface LoginBtnInterface {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean;
}
function LoginBtn({children,
    mode="redirect",
    asChild}:LoginBtnInterface) {
        
  const router = useRouter()
        const handleClick = () => {
            router.push('/auth/login')
        }
  return (
    <span onClick={handleClick}>
        {children}
    </span>
  )
}

export default LoginBtn