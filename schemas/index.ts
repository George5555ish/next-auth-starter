import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(1, {
        message: "Please enter a password"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 password required"
    }),
    confirmPassword: z.string().min(6, {
        message: "Please enter a password"
    }),
    name:  z.string().min(1, {
        message: "Name is required"
    }),
})