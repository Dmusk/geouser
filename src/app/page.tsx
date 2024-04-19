import { UserList } from "@/components";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import getUsers from "./actions/getUsers";

const HomePage = async () => {

    const session = await getAuthSession();

    const users = await getUsers();

    // if (session?.user.email === "aadarshpwadile25772@gmail.com") {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <UserList session={session} users={users} />
        </div>
    )
    // };

    return (
        <div className="flex flex-col items-center justify-center w-full pt-64">
            <div className="flex flex-col items-center justify-center text-center w-full">
                <h1 className="text-2xl font-semibold">
                    Welcome to Profile App
                </h1>
                <p className="text-base text-muted-foreground mt-4">
                    You are not authorized to view this page.
                </p>
                <Button className="mt-4" asChild>
                    <Link href="/">
                        View Github
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default HomePage
