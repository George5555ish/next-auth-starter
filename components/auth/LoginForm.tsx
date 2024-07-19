"use client";
import React, { useState } from "react";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { login } from "@/actions/login.actions";
import { useTransition } from "react";
import { IServerActionsResponse } from "@/types";
import { useSearchParams } from "next/navigation";
export const LoginForm = () => {

  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use": "";
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values:z.infer<typeof LoginSchema>) => {
    setSuccessMsg('');
    setErrorMsg('');
    startTransition(() => {
         login(values)
         .then((data) => {
            if (data.success) {
                setSuccessMsg(data.message);
                return;
            }
            setErrorMsg(data.message);
         }).catch((err) => {
            setErrorMsg(err.message);
         })
    }) 
  }
  return (
    <CardWrapper
      headerLabel={"Welcome back"}
      backButtonLabel={"Don't have an account?"}
      backButtonHref={"/auth/signup"}
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={"email"}
                        disabled={isPending}
                        placeholder="Please enter email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type={"password"}
                        placeholder="******"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          {errorMsg && <FormError message={errorMsg || urlError} />}
          {successMsg && <FormSuccess message={successMsg} />} 
          <Button  disabled={isPending} type="submit" className="w-full space-x-4">Sign In</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
