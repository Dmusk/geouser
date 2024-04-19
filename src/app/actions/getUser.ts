import { db } from "@/lib/db";

const getUser = async (userId: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
        });

        return user;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export default getUser;
