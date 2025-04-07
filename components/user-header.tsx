"use client"

import { User } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function UserHeader() {
    const { user } = useAuth()

    return (
        <header className='flex space-x-3 items-center'>
            <h1 className="text-xl font-semibold">{user?.name}</h1>
            <User fill='000'/>
        </header>
    )
}