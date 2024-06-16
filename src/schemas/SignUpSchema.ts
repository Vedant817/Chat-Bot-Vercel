import {z} from 'zod'

export const SignUpSchema = z.object({
    email: z.string().email({message: "Invalid Email Address"}),
    password: z.string().min(8, {message: "Password must contain at least 8 characters"}),
    username: z.string().min(2, "Username must be at least 2 characters").regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"),
})