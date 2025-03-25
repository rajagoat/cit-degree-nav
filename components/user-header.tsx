import { User } from 'lucide-react'

export default function UserHeader() {
    return (
        <header className='flex space-x-3 items-center'>
            <h1 className="text-xl font-semibold">John Smith</h1>
            <User fill='000'/>
        </header>
    )
}