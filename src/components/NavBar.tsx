"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { account } from '@/lib/appwrite'

const NavBar = () => {
    const [session, setSession] = useState(null)
    useEffect(() => {
        const checkLogin = async () => {
            const Session = await account.get();
            setSession(Session)
        }
        checkLogin()
    }, [])
    return (
        <nav className='p-4 md:p-6 shadow-md bg-black'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                <a className='text-2xl font-bold mb-4 md:mb-0 text-white font-mono' href='/'>
                    <span>Chat Bot: {' '}</span>
                    <span className='font-normal'>Your daily Assistant</span>
                </a>
                {
                    session ? (
                        <Link href='/savedChats'><Button className='w-full md:w-auto text-white bg-green-600 hover:bg-green-800 font-mono'>Save</Button></Link>
                    ) : (
                        <Link href='/sign-in'><Button className='w-full md:w-auto text-white bg-green-600 hover:bg-green-800 font-mono'>Save</Button></Link>
                    )
                }
            </div>
        </nav>
    )
}

export default NavBar