import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface IBackButton {
  href: string;
  label: string;
}
function BackButton({ href, label }: IBackButton) {
  return (
    
      <Button
        variant={"link"}
        size="sm"
        asChild
        className="font-semibold w-full"
      > 
        <Link href={href}>{label}</Link>
      </Button>
    
  );
}

export default BackButton;
