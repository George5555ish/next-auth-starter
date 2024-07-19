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
import { RegisterSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { login, } from "@/actions/login.actions";
import { register, } from "@/actions/register.actions";
import { useTransition } from "react";
import { IServerActionsResponse } from "@/types";
export const SignUpForm = () => {

  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (values:z.infer<typeof RegisterSchema>) => {
    setSuccessMsg('');
    setErrorMsg('');
    startTransition(() => {
         register(values)
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
      headerLabel={"Create account"}
      backButtonLabel={"Already have an account?"}
      backButtonHref={"/auth/login"}
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-4">
          <FormField
              name="name"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field} 
                        disabled={isPending}
                        placeholder="Please enter name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
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
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
          {errorMsg && <FormError message={errorMsg} />}
          {successMsg && <FormSuccess message={successMsg} />} 
          <Button  disabled={isPending} type="submit" className="w-full space-x-4">Register</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
