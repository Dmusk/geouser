"use client";

import React from 'react'
import { Button } from "./ui/button"
import Link from "next/link"
import useSignInModal from "@/store/signin-modal";
import useSignUpModal from "@/store/signup-modal";
import { Session } from "next-auth";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
    session: Session | null;
}

const Navbar = ({ session }: Props) => {

    const router = useRouter();

    const { isOpen: isSignInOpen, setIsOpen: setIsSignInOpen } = useSignInModal();

    const { isOpen: isSignUpOpen, setIsOpen: setIsSignUpOpen } = useSignUpModal();

    const handleSignIn = () => {
        setIsSignInOpen(true);
        setIsSignUpOpen(false);
    };

    const handleSignUp = () => {
        setIsSignUpOpen(true);
        setIsSignInOpen(false);
    };

    const handleLogout = async () => {
        try {
            await signOut();

            router.refresh();

            toast.success("You have been logged out successfully.");
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while logging out.");
        }
    };

    return (
        <header className="sticky top-0 inset-x-0 bg-white/40 backdrop-blur-md border-b border-border z-50 w-full h-14">
            <div className="flex items-center justify-between px-4 h-full md:px-8 w-full">
                <div className="flex items-center justify-center">
                    <Link href="/">
                        <h1 className="text-lg md:text-xl font-bold">
                            GeoUser
                        </h1>
                    </Link>
                </div>
                <div className="flex items-center justify-end gap-x-4">
                    {session?.user ? (
                        <div className="flex items-center justify-end gap-x-6">
                            <Link href={`/u/${session?.user.id}`} className="flex items-center">
                                <Avatar className="w-8 h-8 object-cover">
                                    <AvatarImage src={session?.user.image ?? "https://github.com/shadcn.png"} alt="@user" />
                                    <AvatarFallback>UR</AvatarFallback>
                                </Avatar>
                                <span className="ml-2 text-sm font-semibold capitalize">
                                    {session?.user.name}
                                </span>
                            </Link>
                            <Button onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex gap-x-4 items-center">
                            <Button variant="ghost" onClick={handleSignIn}>
                                Login
                            </Button>
                            <Button onClick={handleSignUp}>
                                Sign Up
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar
