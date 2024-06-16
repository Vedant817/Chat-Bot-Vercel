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
import { SignInSchema } from '@/schemas/SignInSchema'
import { account, ID } from "@/lib/appwrite";

const SignInPage = () => {
    const [loggedInUser, setLoggedInUser] = useState(null)
    const router = useRouter()

    const signIn = async (data: z.infer<typeof SignInSchema>) => {
        try {
            const session = await account.createEmailPasswordSession(data.email, data.password)
            const loggedUser = await account.get()
            setLoggedInUser(loggedUser)
            router.replace('/chat')
        } catch (error) {
            console.log(error)
        }
    }

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    return (
        <div className='bg-black flex justify-center items-center min-h-screen'>
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-500 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Login
                    </h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(signIn)} className="space-y-8">
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
                                            <Input placeholder="Password" {...field} />
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
                            New User? {' '}
                            <Link href='/sign-up' className="text-blue-700 hover:text-blue-800 font-semibold">SignUp</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage