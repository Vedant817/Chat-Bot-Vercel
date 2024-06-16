"use client"
import React, { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Form } from "@/components/ui/form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SignUpSchema } from '@/schemas/SignUpSchema'
import { account, ID } from "@/lib/appwrite";

const SignUpPage = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = async (data: z.infer<typeof SignUpSchema>) => {
        try {
            console.log(data.email, data.password, data.username);
            const response = await account.create(ID.unique(), data.email, data.password, data.username)
            console.log(response);
            router.replace('/sign-up')
        } catch (error) {
            console.log(error);
        }
    }

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })

    return (
        <div className='bg-black flex justify-center items-center min-h-screen'>
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-500 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Sign Up
                    </h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(signUp)} className="space-y-8">
                            <FormField
                                name="username"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                    <div className='text-center m-4'>
                        <p>
                            Already a user? {' '}
                            <Link href='/sign-in' className="text-blue-700 hover:text-blue-800 font-semibold">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
