import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SignInModal, SignUpModal, Navbar, ProfileModal, Provider } from "@/components";
import { Toaster } from "@/components/ui/sonner";
import { getAuthSession } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";

const font = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Profile App",
    description: "A profile app built with Next.js and TypeScript.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await getAuthSession();

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
            </head>

            <Provider>
                <body className={cn(
                    "min-h-screen antialiased bg-background text-foreground",
                    font.className
                )}>

                    <Toaster
                        richColors
                        position="bottom-center"
                        theme="light"
                    />

                    <SignInModal />
                    <SignUpModal />
                    <ProfileModal />

                    <Navbar session={session} />

                    {children}

                </body>
            </Provider>
        </html>
    );
};
