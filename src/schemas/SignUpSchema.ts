import {z} from 'zod'

export const SignUpSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters").regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"),
    email: z.string().email({message: "Invalid Email Address"}),
    password: z.string().min(6, {message: "Password must contain at least 6 characters"})
})