import { Toaster } from "sonner"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
            <Toaster position="top-right" />
        </>
    )
}