import { Input } from "./ui/input";

export function SearchBar({
    label
}: {
    label: string
}){
    return (
        <Input className="w-[80%] h-[60px] border border-gray-500/50 shadow-sm shadow-gray-600 bg-white text-black p-4 justify-start rounded-3xl"
            placeholder={label}
        >

        </Input>
    )
}