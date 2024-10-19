import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <div>
        <div id="results-footer-web" className="hidden md:flex justify-between w-full h-[100px] mt-24">
            <div className="flex items-center space-x-6 ml-4">
                <div className="flex w-[107px] h-[29px]">
                    <Link href={"/"}>
                        <div className="transition-transform duration-300 hover:scale-110">
                            <Image alt="logo" src={"/logo--gray.png"} width={150} height={50} objectFit="cover" />
                        </div>
                    </Link>
                </div>
                <div className="flex w-[415px] h-[20px]">
                    <Image alt="copyright 2024 , all rights reserved" src={"/copyright.png"} width={415} height={20} objectFit="cover" />
                </div>
            </div>

            <div className="flex items-center space-x-6 mr-4">
                <div className="flex w-[32px] h-[33px]">
                    <Link href={"https://www.instagram.com//"} target="_blank">
                        <div className="transition-transform duration-300 hover:scale-110">
                            <Image alt="logo instagram" src={"/logo/instagram-logo.png"} width={32} height={33} objectFit="cover" />
                        </div>
                    </Link>
                </div>
                <div className="flex w-[32px] h-[33px]">
                    <Link href={"https://www.linkedin.com/company//"} target="_blank">
                        <div className="transition-transform duration-300 hover:scale-110">
                            <Image alt="logo linkedin" src={"/logo/linkedin-logo.png"} width={32} height={33} objectFit="cover" />
                        </div>
                    </Link>
                </div>
                <div className="flex w-[32px] h-[33px]">
                    <Link href={"https://wa.me/5519999234296"} target="_blank">
                        <div className="transition-transform duration-300 hover:scale-110">
                            <Image alt="logo whatsapp" src={"/logo/whatsapp-logo.png"} width={32} height={33} objectFit="cover" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        </div>
    );
}
