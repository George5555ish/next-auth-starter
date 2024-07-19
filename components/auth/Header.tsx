import React from "react";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface IHeader {
  label: string;
}
function Header({label}:IHeader) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1
        className={cn(
          "text-3xl font-semibold drop-shadow-md",
          font.className
        )}
      >
        Auth
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}

export default Header;
