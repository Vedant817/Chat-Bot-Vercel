"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const NavBar = () => {
    return (
        <nav className='p-4 md:p-6 shadow-md bg-zinc-800'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <a className='text-xl font-bold mb-4 md:mb-0 text-white' href='/'>
                <span>Chat Bot: {' '}</span>
                <span className='font-normal'>Your daily Assistant</span>
            </a>
            <Link href='/sign-in'><Button className='w-full md:w-auto text-white bg-green-600 hover:bg-green-800'>Login</Button></Link>
            </div>
        </nav>
    )
}

export default NavBar