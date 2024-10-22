import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
  import React from "react"
import { Separator } from "./ui/separator"
  
  export function CResizablePanel({
    top_children,
    bottom_children,
  }: {
    top_children: React.ReactNode,
    bottom_children: React.ReactNode,
  }) {
    return (
      <ResizablePanelGroup
        direction="vertical"
        className="max-w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={50}>
          {top_children}
        </ResizablePanel>
        <Separator className="bg-black/50"/>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          {bottom_children}
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  }
  