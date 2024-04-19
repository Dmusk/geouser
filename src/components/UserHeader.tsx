"use client";

import React from 'react'
import { Button } from "./ui/button";
import useProfileModal from "@/store/create-profile-modal";
import isAdmin from "@/lib/admin";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

const UserHeader = () => {

    const { data: session } = useSession();

    const { isOpen, setIsOpen } = useProfileModal();

    const handleOpen = () => {
        setIsOpen(true);
    };

    const admin = isAdmin(session?.user as User);

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold w-full text-start">
                    Profiles
                </h2>
                <p className="text-base text-muted-foreground">
                    Explore the profiles and their locations.
                </p>
            </div>
            {admin && (
                <Button onClick={handleOpen}>
                    Create Profile
                </Button>
            )}
        </div>
    )
}

export default UserHeader
