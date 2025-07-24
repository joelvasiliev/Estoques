import { ReactNode } from "react";
import './globals.css';
import NextAuthSessionProvider from "@/providers/sessionProvider";
import { FormProvider } from "@/context/FormContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        
        <FormProvider>
          <NextAuthSessionProvider>
            {children}
          </NextAuthSessionProvider>
        </FormProvider>
      </body>
    </html>
  )
}