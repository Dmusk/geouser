"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const createProfile = async (data: FormData) => {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const address = data.get("address") as string;
    const image = data.get("image") as string;

    try {
        await db.user.create({
            data: {
                name,
                email,
                address,
                image,
            },
        });
    } catch (error) {
        console.log("There was a problem!", error);
    }

    revalidatePath("/");
};

export default createProfile;
