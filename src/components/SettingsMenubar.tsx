import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { signOut } from "next-auth/react";

  type SettingsMenubarProps = {
    children: React.ReactNode;
    className: string;
  }
  
  export function SettingsMenubar(props: SettingsMenubarProps) {
    return (
      <Menubar className={props.className}>
        <MenubarMenu>
          <MenubarTrigger>{props.children}</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => signOut()} className="cursor-pointer hover:bg-gray-500 rounded-xl p-1">
              Sair da conta
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>       
      </Menubar>
    )
  }  