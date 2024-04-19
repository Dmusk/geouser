import React from 'react';
import { Map } from "@/components";
import { getAuthSession } from "@/lib/auth";
import getUser from "../../actions/getUser";

interface Props {
    params: {
        mapId: string
    }
}

const MapPage = async ({ params }: Props) => {

    const user = await getUser(params.mapId);

    return (
        <div className="w-full h-screen">
            <Map user={user!} />
        </div>
    )
};

export default MapPage
