import { Sidebar } from "@/components/Sidebar";
import { GraphsSection } from "@/sections/GraphsSection";

export default function Page(){
    return (
        <div className="flex w-full h-full p-2">
            <Sidebar/>
            <GraphsSection/>
        </div>
    )
}