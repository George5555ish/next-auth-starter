"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import Header from "./Header";
import Socials from "./Socials";
import BackButton from "./BackButton";
interface ICardWrapper {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial: boolean;
}
function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: ICardWrapper) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    {showSocial && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}  
        <BackButton href={backButtonHref} label={backButtonLabel}></BackButton>
   
    </Card>
  );
}

export default CardWrapper;
