"use client"

import React from "react";
import {Sidebar} from "../../components/Sidebar";
import {ProductsList} from "../../sections/ProductsSection";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page(){
    const session = useSession();
    const router = useRouter();
    if(!session) router.push('/');

    if(session)
    return (
        <div className="flex w-full h-screen p-2">
            <Sidebar/>
                <ProductsList/>
        </div>
    )
}