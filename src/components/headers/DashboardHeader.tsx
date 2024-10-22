"use client"

import Image from "next/image";
import Link from "next/link";

export const DashboardHeader = ({
    page,
    darkMode,
}: {
    page?: "search" | "discovery" | "membership"|"results";
    name?: string;
    membershipType?: ""|"basic"|"pro"
    tokens?: number,
    darkMode?: boolean
}) => {

  return (
    <div className={`w-full h-[70px] flex font-semibold items-center p-12 justify-center gap-6`}>
        <Link href={"/"}>
        <Image
            className="h-[36px] hidden md:flex"
            alt="logo"
            src={darkMode ? "/logo-black.png" : "/logo-white-and-green.png"}
            width={134}
            height={36}
        />
        </Link>
        <Link href={"/"}>
        <Image
            className="h-[36px] flex md:hidden justify-start"
            alt="logo"
            src={"/small-logo-green.png"}
            width={36}
            height={36}
        />
        </Link>
        <div className="hidden md:flex justify-center text-white font-semibold items-center gap-10 w-[40%]">
            <a href="/produtos" className={`${darkMode && 'text-black'} ${page === "search" ? "text-[#005A5A]" : null} `}>Pesquisar</a>
            <a href="/discovery" className={`${darkMode && 'text-black'} ${page === "discovery" ? "text-[#005A5A]" : null} `}>Ofertas</a>
            <a href="/membership" className={`${darkMode && 'text-black'} ${page === "membership" ? "text-[#005A5A]" : null} `}>Planos</a>
        </div>
    </div>
  );
}
