"use client";

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import useSignInModal from "@/store/signin-modal";
import useSignUpModal from "@/store/signup-modal";
import { Button } from "./ui/button";
import Icons from "./Icons";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const SignUpModal = () => {

    const router = useRouter();

    const { isOpen: isSignInOpen, setIsOpen: setIsSignInOpen } = useSignInModal();

    const { isOpen: isSignUpOpen, setIsOpen: setIsSignUpOpen } = useSignUpModal();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleOpenSignInModal = () => {
        setIsSignInOpen(true);
        setIsSignUpOpen(false);
    };

    const handleSignUp = async () => {
        setIsLoading(true);

        try {
            await signIn('google');
        } catch (error) {
            toast.error("There was a problem!", {
                description: "There was an error while signing in. Please try again."
            });
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    };

    return (
        <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
            <DialogContent className="w-full max-w-sm">
                <DialogHeader className="">
                    <DialogTitle className="font-extrabold md:text-2xl lg:text-3xl">
                        Sign Up
                    </DialogTitle>
                    <DialogDescription className="mt-8 text-base">
                        Sign up for a new account to continue.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center w-full mt-4 gap-y-4">
                    <div className="flex flex-col items-center justify-center w-full">
                        <Button size="lg" className="w-full text-base" onClick={handleSignUp}>
                            {isLoading ? (
                                <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
                            ) : (
                                <>
                                    <Icons.google className="w-5 h-5 mr-2" />
                                    <span className="flex-1">
                                        Continue with google
                                    </span>
                                </>
                            )}
                        </Button>
                        <p className="text-sm text-center mt-4">
                            Already have an account?{" "}
                            <Button size="sm" variant="link" className="px-0 text-sm hover:text-black hover:no-underline" onClick={handleOpenSignInModal}>
                                Sign in
                            </Button>
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
};

export default SignUpModal
