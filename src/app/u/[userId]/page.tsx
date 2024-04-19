import React from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import getUser from "@/app/actions/getUser";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/components";

interface Props {
    params: {
        userId: string
    }
}

const UserPage = async ({ params }: Props) => {

    const user = await getUser(params.userId);

    return (
        <div className="flex flex-col items-start w-full max-w-7xl mx-auto px-4 md:px-0 py-8">
            <div className="flex flex-col items-start w-full py-4">
                <h1 className="text-2xl font-semibold">
                    Profile
                </h1>

                <UserInfo user={user} />

            </div>
        </div>
    )
}

export default UserPage
