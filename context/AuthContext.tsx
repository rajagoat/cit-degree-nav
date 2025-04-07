"use client"

import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { users, type User } from '@/data/mockData'

const USER_COOKIE_NAME = "user"
const USER_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

const AuthContext = createContext<{
    user: User | null;
    login: (email: string, password: string) => User | null;
    logout: () => void;
}>({
    user: null,
    login: () => null,
    logout: () => { },
});

const authenticateUser = (email: string, password: string) => {
    const user = users.find(user => user.email === email && user.password === password);
    return user || null;
};

const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    return match ? decodeURIComponent(match[2]) : null
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const userId = getCookie(USER_COOKIE_NAME)
        if (userId) {
            const matchedUser = users.find(user => user.id === Number(userId))
            if (matchedUser) {
                setUser(matchedUser)
            }
        }
    }, [])

    const login = (email: string, password: string): User | null => {
        const authenticatedUser = authenticateUser(email, password)
        if (authenticatedUser) {
            setUser(authenticatedUser)

            // This sets the cookie to keep the user state.
            document.cookie = `${USER_COOKIE_NAME}=${authenticatedUser.id}; path=/; max-age=${USER_COOKIE_MAX_AGE}`    
        }
        return authenticatedUser
    };

    const logout = () => {
        setUser(null);

        // Clear user cookie by setting it to expire in the past
        document.cookie = `${USER_COOKIE_NAME}=; path=/; max-age=0`
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext)
};