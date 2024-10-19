"use client"

import { ArrowRight, ChartPie, CircleDollarSign, Home, Settings2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { useState } from "react";

export function Sidebar(){
    const [open, setOpen] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const isCurrentPage = (page: string) => {
        if(pathname === `/${page}`) return true;
        return false;
    }

    const handleClick = () => { setOpen(!open) }

    return (
        <div className={`flex flex-col bg-white p-4 rounded-xl h-screen transition-all duration-700 ${open ? "min-w-[20%]" : "min-w-[3%]"} overflow-hidden`} style={{ boxShadow: '0 10px 15px rgba(0, 0, 0, 0.3)' }}>
            <div className="flex w-full justify-between">
                {open && <p className={`font-bold ml-6 transition-opacity duration-700`}>Nome</p>}
                {open ? (
                    <X onClick={handleClick} className="cursor-pointer hover:scale-110" size={24}/>
                ) : (
                    <ArrowRight onClick={handleClick} size={28} className="cursor-pointer hover:scale-110"/>
                )}
            </div>
                {open && 
                    <div className="flex flex-col h-full">
                        <div id="sidebar-abas" className="flex flex-col ml-2 mt-12 p-2 space-y-4">
                            <div onClick={() => {router.push('/painel')}} className={`flex w-full justify-between rounded-full p-3 cursor-pointer ${isCurrentPage("painel") && 'bg-gray-300/50'}`}>
                                <p className="ml-4 flex items-center text-center text-foreground">Início</p>
                                <Home size={24}/>
                            </div>
                            <div onClick={() => {router.push('/graficos')}} className={`flex w-full justify-between rounded-full p-3 cursor-pointer ${isCurrentPage("graficos") && 'bg-gray-300/50'}`}>
                                <p className="ml-4 flex items-center text-center text-foreground">Gráficos</p>
                                <ChartPie size={24}/>
                            </div>
                            <div onClick={() => {router.push('/vendas')}} className={`flex w-full justify-between rounded-full p-3 cursor-pointer ${isCurrentPage("vendas") && 'bg-gray-300/50'}`}>
                                <p className="ml-4 flex items-center text-center text-foreground">Vendas</p>
                                <CircleDollarSign size={24}/>
                            </div>
                        </div>
                    
                        <div id="configuracoes" className="flex w-full justify-between items-end mt-auto">
                            <p className="text-gray-500/50">Configurações</p>
                            <Settings2 className="cursor-pointer" size={24}/>
                        </div>
                    </div>
                
                }
                {
                    !open &&
                    <div className="flex flex-col space-y-4 mt-12 h-full">
                        <div className="flex flex-col space-y-6">
                            <Home className="cursor-pointer" onClick={() => {router.push('/painel')}} size={24}/>
                            <ChartPie className="cursor-pointer" onClick={() => {router.push('/graficos')}} size={24}/>
                            <CircleDollarSign className="cursor-pointer" onClick={() => {router.push('/vendas')}} size={24}/>
                        </div>
                        <div className="flex w-full justify-between h-full items-end">
                            <Settings2 className="cursor-pointer" size={24}/>
                        </div>
                    </div>
                }
            
        </div>
    )
}
