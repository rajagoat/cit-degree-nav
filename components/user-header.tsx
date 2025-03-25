import { User } from 'lucide-react'

export default function UserHeader() {
    return (
        <header className='flex space-x-3'>
            <h1>John Smith</h1>
            <User fill='000'/>
        </header>
    )
}