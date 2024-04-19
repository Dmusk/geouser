"use server";

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

const updateAddress = async (address: string, userId: string) => {
    try {
        const updateUser = await db.user.update({
            where: {
                id: userId,
            },
            data: {
                address: address,
            }
        });

        return updateUser;
    } catch (error) {
        console.log(error);
    }

    revalidatePath(`/u/${userId}`, "layout");
};

export default updateAddress;
