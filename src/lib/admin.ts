import { User } from "@prisma/client";

const isAdmin = (user: User): boolean => {
    return user?.email! === "aadarshpwadile25772@gmail.com";
};

export default isAdmin;