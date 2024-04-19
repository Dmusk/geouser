import Image from "next/image"
import React from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { LocateFixed } from 'lucide-react';
import Link from "next/link";
import { Session } from "next-auth";
import UserHeader from "./UserHeader";
import { User } from "@prisma/client";

interface Props {
    session: Session | null;
    users: User[];
}

const UserList = ({ session, users }: Props) => {
    return (
        <div className="flex flex-col items-center justify-start max-w-2xl py-10 mx-auto w-full">

            <UserHeader />

            <div className="mt-8 flex w-full flex-col items-center">
                <ul className="w-full space-y-4">
                    {users.length === 0 && (
                        <div className="flex flex-col items-start my-4">
                            <p className="text-muted-foreground text-base">
                                There are no users for now.
                            </p>
                        </div>
                    )}
                    {users?.map((user) => (
                        <li key={user.id} className="px-4 py-3 rounded-lg border border-border flex items-start justify-between w-full">
                            <div className="flex items-center justify-start flex-1 w-full">
                                <div className="flex items-center w-10 h-10 rounded-full">
                                    <Avatar className="object-cover">
                                        <AvatarImage src={user?.image ?? "https://github.com/shadcn.png"} alt={user?.name!} />
                                        <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="ml-4">
                                    <Link href={`/u/${user?.id}`} className="">
                                        <h3 className="text-base font-bold">
                                            {user?.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {user?.address}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center justify-end">
                                <Button variant="outline" asChild>
                                    <Link href={`/m/${user?.id}`} className="flex items-center">
                                        <LocateFixed className="w-5 h-5 mr-2" />
                                        Summary
                                    </Link>
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default UserList
