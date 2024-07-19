import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
function Socials() {
  const handleSocialSignIn = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size={"lg"} className={"w-full"} variant="outline" onClick={() => {handleSocialSignIn('google')}}>
        <FcGoogle />
      </Button>

      <Button size={"lg"} className={"w-full"} variant="outline" onClick={() => {}}>
        <FaGithub />
      </Button>
    </div>
  );
}

export default Socials;
