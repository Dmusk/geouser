import { LoaderIcon } from "lucide-react"
import React from 'react'

const Loader = () => {
    return (
        <div className="bg-background w-screen h-screen z-[1000] absolute flex items-center justify-center inset-0">
            <LoaderIcon className="w-5 h-5 animate-spin" />
        </div>
    )
};

export default Loader
