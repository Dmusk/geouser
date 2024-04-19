"use client";

import React, { FormEvent, useRef, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Link from "next/link";
import { Button } from "./ui/button";
import Icons from "./Icons";
import { signIn } from 'next-auth/react';
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader, X } from "lucide-react";
import useProfileModal from "@/store/create-profile-modal";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import createProfile from "@/app/actions/createProfile";

const ProfileModal = () => {

    const router = useRouter();

    const ref = useRef<HTMLFormElement>(null);

    const { isOpen, setIsOpen } = useProfileModal();

    const [imageUrl, setImageUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        if (!ref.current) return;
        const formData = new FormData(ref.current);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const address = formData.get("address") as string;

        if (!name || !email || !address) {
            toast.error("There was a problem!", {
                description: "Please fill in all the fields."
            });
            return;
        }

        formData.set("image", imageUrl);

        try {
            await createProfile(formData);
        } catch (error) {
            toast.error("There was a problem!", {
                description: "There was an error while creating the profile. Please try again."
            });
        } finally {
            setIsLoading(false);
            router.refresh();
            setIsOpen(false);
            setImageUrl("");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-full max-w-sm">
                <DialogHeader className="">
                    <DialogTitle className="font-bold md:text-2xl">
                        Create Profile
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center w-full mt-4 gap-y-4">
                    <form ref={ref} onSubmit={handleCreate} className="w-full space-y-4">
                        <div className="w-full">
                            <Input
                                id="name"
                                name="name"
                                type="name"
                                placeholder="Name"
                                className="w-full"
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                className="w-full"
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                id="address"
                                name="address"
                                type="text"
                                placeholder="Address"
                                className="w-full"
                            />
                        </div>
                        <div className="w-full flex items-center justify-between">
                            {imageUrl ? (
                                <Avatar className="object-cover">
                                    <AvatarImage src={imageUrl ? imageUrl : "https://github.com/shadcn.png"} alt="@user" />
                                    <AvatarFallback>UR</AvatarFallback>
                                </Avatar>
                            ) : (
                                <Input
                                    id="image"
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="Paste Image URL"
                                    className="w-full"
                                />
                            )}
                            {imageUrl && (
                                <Button type="button" size="icon" variant="outline" className="ml-2" onClick={() => setImageUrl("")}>
                                    <X className="w-5 h-5" />
                                </Button>
                            )}
                        </div>
                        <div className="w-full pt-2">
                            <Button type="submit" size="lg" className="w-full text-base font-normal">
                                {isLoading ? (
                                    <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
                                ) : "Create Profile"}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog >
    )
};

export default ProfileModal
