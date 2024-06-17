"use client"
import React, { useEffect, useState } from 'react'
import { account, database } from '@/lib/appwrite'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const SavedChats = () => {
    interface Chat {
        prompt: string;
        response: string
    }

    const [Chats, setChats] = useState([]);
    const router = useRouter()
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const session = await account.get();
                if (!session || !session.name) {
                    router.push('/sign-in');
                }
                else {
                    const userId = session.$id;
                    const response = await axios.post('/api/savedChats', { userId })
                    const result = response.data.chats.documents
                    setChats(result)
                }
            } catch (error) {
                console.error('Error fetching session:', error);
                router.push('/sign-in');
            }
        };
        fetchChats();
    }, [router]);

    return (
        <div className='bg-black flex justify-center items-center min-h-screen flex-col'>
            <h1 className='text-4xl font-semibold tracking-tight lg:text-5xl mb-6 text-white'>
                <p className='mb-4'>Saved Chats</p>
            </h1>
            {Chats && (
                <div className='w-full max-w-xl p-8 space-y-8 bg-gray-500 rounded-lg shadow-md'>
                    {
                        Chats.map((chat, index) => (
                            <div key={index}>
                                <div className='bg-gray-700 text-white border-gray-600 p-2 rounded-lg'>
                                    <p className='mb-3'>
                                        <span className='text-2xl text-extrabold text-red-500'>Prompt: </span>
                                        <span className='text-xl text-justify'>{chat.prompt}</span>
                                    </p>
                                    <p className='mb-3'>
                                        <span className='text-2xl text-extrabold text-green-500'>Response: </span>
                                        <span className='text-xl text-justify'>{chat.response}</span>
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default SavedChats