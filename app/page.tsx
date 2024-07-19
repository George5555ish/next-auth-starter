import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import LoginBtn from "@/components/auth/LoginBtn";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <div
      className="flex h-full flex-col items-center justify-center 
    bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-violet-400 to-blue-400"
    >
      <div className="text-center space-y-6">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          Auth
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
      </div>
        <LoginBtn>
             <Button variant="secondary" size='lg'>
        Sign In
      </Button>
        </LoginBtn>
   
    </div>
  );
}
