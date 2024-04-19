"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const deleteProfile = async (userId: string) => {

    try {
        await db.user.delete({
            where: {
                id: userId,
            },
        });
    } catch (error) {
        console.log("There was a problem!", error);
    }

    revalidatePath(`/u/${userId}`);
};

export default deleteProfile;
