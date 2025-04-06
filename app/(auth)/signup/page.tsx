"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import CitLogo from "@/public/cit-logo.png"
import SignUpImage from "@/public/signup-photo.jpg"

// Form validation schema
const signupSchema = z.object({
    email: z.string().email({ message: "Please enter a valid CIT email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type LoginFormValues = z.infer<typeof signupSchema>

export default function SignUp() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // Initialize form with react-hook-form
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // Handle form submission
    async function onSubmit(data: LoginFormValues) {
        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast.success("Login successful", {
                description: "Redirecting to dashboard...",
            })

            // Redirect to dashboard after successful login
            setTimeout(() => {
                router.push("/")
            }, 1500)
        } catch (error) {
            toast.error("Login failed", {
                description: "Please check your credentials and try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#A31621] py-8">
            <div className="container mx-auto max-w-6xl">
                <div className="overflow-hidden shadow-xl">
                    <div className="grid lg:grid-cols-2 lg:h-[85vh]">
                        {/* Left Column - Sign Up Form */}
                        <div className="flex flex-col items-center justify-center bg-[#4E8098] px-8 py-12 text-white">
                            <div className="mx-auto w-full max-w-md">
                                {/* Logo */}
                                <div className="mb-8 flex justify-center">
                                    <div className="relative aspect-square w-64 overflow-hidden rounded-full border-white/20">
                                        <Image
                                            src={CitLogo}
                                            alt="CIT Logo"
                                            priority
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>

                                {/* Sign Up Form */}
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <h1 className="text-5xl font-bold tracking-tight">Sign Up</h1>
                                        <p className="text-lg text-white/90">Enter your account details</p>
                                    </div>

                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">CIT Email</p>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder=""
                                                className="border-0 border-b border-white/50 bg-transparent px-0 text-white placeholder:text-white/50 focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0"
                                                {...form.register("email")}
                                            />
                                            {form.formState.errors.email && (
                                                <p className="text-sm text-red-300">{form.formState.errors.email.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">Password</p>
                                            <Input
                                                id="password"
                                                type="password"
                                                className="border-0 border-b border-white/50 bg-transparent px-0 text-white placeholder:text-white/50 focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0"
                                                {...form.register("password")}
                                            />
                                            {form.formState.errors.password && (
                                                <p className="text-sm text-red-300">{form.formState.errors.password.message}</p>
                                            )}
                                        </div>

                                        <div className="text-sm invisible">
                                            filler text
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-gray-200/90 text-gray-800 hover:bg-white"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Signing up..." : "Sign Up"}
                                        </Button>
                                    </form>

                                    <div className="flex items-center justify-between pt-4">
                                        <span className="text-sm text-white/90">Already have an account?</span>
                                        <Button variant="secondary" className="bg-gray-600/50 text-white hover:bg-gray-600" asChild>
                                            <Link href="/login">Log In</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Image */}
                        <div className="hidden lg:block">
                            <div className="relative h-full w-full">
                                <Image
                                    src={SignUpImage}
                                    alt="CIT Student studying"
                                    width={1000}
                                    height={800}
                                    className="h-full w-full object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}