import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

interface CTooltipProps {
    children: React.ReactNode,
    label: string
}

export function CTooltip(props: CTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {props.children}
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white text-[14px] ronded-full p-1 text-center w-fit">
          <p>{props.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
