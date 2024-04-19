"use client";

import React, { useState } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import getUser from "@/app/actions/getUser";
import { Input } from "@/components/ui/input";
import { Loader, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import updateAddress from "@/app/actions/updateAddress";
import { useRouter } from "next/navigation";
import deleteProfile from "@/app/actions/deleteProfile";
import Map from "./Map";
import isAdmin from '@/lib/admin';
import { useSession } from 'next-auth/react';

interface Props {
    user: User | null;
}

const UserInfo = ({ user }: Props) => {

    const router = useRouter();

    const { data: session } = useSession();

    const admin = isAdmin(session?.user! as any);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [newAddress, setNewAddress] = useState<string>(user?.address || '');

    const handleEditAddress = () => {
        setIsEditing(true);
    };

    const handleSaveAddress = async () => {
        setIsLoading(true);

        try {
            if (!user) {
                toast.error("You are not authorized to perform this action.");
                return;
            }

            // Update the address
            await updateAddress(newAddress, user?.id);

            router.refresh();

            toast.success("Your address has been updated successfully.");

            setIsEditing(false);
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while updating the address.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsEditing(false);
        setNewAddress(user?.address || '');
    };

    const handleDelete = async () => {
        if (user) {
            setIsDeleting(true);

            try {
                await deleteProfile(user?.id!);

                router.refresh();

                toast.success("User profile has been deleted successfully.");
            } catch (error) {
                console.log(error);
                toast.error("An error occurred while deleting the user profile.");
            } finally {
                setIsDeleting(false);
            }
        } else {
            toast.info("You are not authorized to perform this action.");
        }
    };


    return (
        <div className="flex items-center justify-between w-full gap-8 flex-col md:flex-row mt-4">
            <div className="flex flex-col items-start w-full">
                <div className="flex items-center justify-start w-full">
                    <Avatar className="w-20 h-20 object-cover">
                        <AvatarImage src={user ? user?.image! : "https://github.com/shadcn.png"} alt={user?.name!} />
                        <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex items-start justify-between w-full">
                        <div className="flex flex-col items-start">
                            <h2 className="text-2xl md:text-4xl font-bold capitalize">
                                {user?.name}
                            </h2>
                            <p className="text-base text-muted-foreground mt-1">
                                Joined on {new Date(user?.createdAt!).toDateString()}
                            </p>
                        </div>
                        {admin && (
                            <Button variant="destructive" className="w-28" onClick={handleDelete}>
                                {isDeleting ? (
                                    <Loader className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-start mt-4 w-full">
                    <span className="text-xl font-semibold">
                        Contact Information
                    </span>
                    <div className="text-base text-neutral-800 w-full mt-8 pb-2">
                        <div className="font-semibold flex items-start justify-start w-full">
                            <span>
                                Email
                            </span>
                        </div>
                        <Input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            readOnly
                            className="text-base border-none px-0 text-neutral-700 w-full disabled:opacity-100"
                        />
                    </div>
                    <div className="text-base text-neutral-800 w-full pt-4 border-t border-border">
                        <div className="font-semibold flex items-center justify-between w-full">
                            <span>
                                Address
                            </span>
                            <Button size="sm" variant="outline" onClick={handleEditAddress}>
                                Edit
                            </Button>
                        </div>
                        <div className="flex items-center justify-center w-full mt-2">
                            {isEditing ? (
                                <Input
                                    type="text"
                                    value={newAddress}
                                    disabled={isLoading}
                                    onChange={e => setNewAddress(e.target.value)}
                                    placeholder={user?.address ? '' : "Add your address here."}
                                    className="text-base px-4 border-border text-neutral-700 placeholder:text-neutral-500 w-full"
                                />
                            ) : (
                                <Input
                                    type="text"
                                    value={user?.address || "You haven't added an address yet."}
                                    readOnly
                                    disabled
                                    className="text-base border-none px-0 text-neutral-700 placeholder:text-neutral-500 w-full disabled:opacity-100"
                                />
                            )}
                            {isEditing && (
                                <>
                                    <Button variant="outline" disabled={isLoading} onClick={handleClose} className="w-20 ml-4">
                                        Cancel
                                    </Button>
                                    <Button disabled={isLoading} onClick={handleSaveAddress} className="w-24 ml-4">
                                        {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : 'Save'}
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-base w-full mt-2">
                <div className="font-semibold text-neutral-800 flex flex-col items-start justify-start w-full">
                    <span>
                        Map
                    </span>
                    <p className="text-neutral-500 text-sm mt-1">
                        The map shows the geographic location of the user&apos;s address.
                    </p>
                </div>
                <div className="flex items-center justify-center min-h-[450px] h-full overflow-hidden mt-4 max-w-2xl mx-auto relative">
                    <Map user={user!} />
                </div>
            </div>
        </div>
    )
}

export default UserInfo
