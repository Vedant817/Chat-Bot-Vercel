"use client"
import React, { useEffect, useState } from 'react'
import { account } from '@/lib/appwrite'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { PromptSchema } from '@/schemas/PromptSchema'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import NavBar from '@/components/NavBar'
//! Axios was not helpful for streaming of the text

const ChatPage = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [streamingText, setStreamingText] = useState('');
  useEffect(() => {
    const getUser = async () => {
      try {
        const session = await account.get();

        if (!session || !session.name) {
          router.push('/sign-in');
        } else {
          setName(session.name);
        }
      } catch (error) {
        console.error('Error fetching user session:', error);
        router.push('/sign-in');
      }
    };
    getUser();
  }, []);

  const form = useForm<z.infer<typeof PromptSchema>>({
    resolver: zodResolver(PromptSchema),
    defaultValues: {
      prompt: ''
    }
  })

  async function onSubmit(values: z.infer<typeof PromptSchema>) {
    try {
      setStreamingText('')
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      })
      console.log(response);
      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          setStreamingText((prev) => prev + decoder.decode(value));
        }
      } else {
        console.error('Response body is null');
      }
    } catch (error) {
      console.error(error)
    } finally {
      form.reset() // Reset the form after submission
    }
  }

  return (
    <>
    <NavBar />
    <div className='bg-black flex justify-center items-center min-h-screen flex-col mt-[-50px]'>
      <h1 className='text-4xl font-semibold tracking-tight lg:text-5xl mb-6 text-white'>
        <p className='mb-4'>Welcome {name} !! 👋</p>
        <p className='text-center'>Lets Chat 💻</p>
      </h1>
      <div className='w-full max-w-xl p-8 space-y-8 bg-gray-500 rounded-lg shadow-md'>
        <div className='text-center'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                name="prompt"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-2xl'>Prompt</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your prompt" {...field} className='bg-gray-700 text-white border-gray-600' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          {streamingText && (
            <div className="mt-4 bg-gray-700 text-white p-4 rounded-lg shadow-md text-left whitespace-pre-wrap text-lg text-semibold">
              {streamingText}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default ChatPage