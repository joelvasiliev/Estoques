"use client"

import Image from "next/image"

import Link from "next/link"
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { LoginInputForm } from "@/components/form/LoginInputForm";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/Footer";
import GoogleSSOButton from "@/components/GoogleSignInButton";
import { VerifyEmailCard } from "@/components/VerifyEmailCard";

export type LoginFormValues = {
    email: string
}

export const WelcomeSection = () => {
    const session = useSession();
    const [toggleVerifyEmailPopup, setToggleVerifyEmailPopup] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        defaultValues: {
            email: '',
        }
    });

    const onSubmit = async (data: LoginFormValues) => {
      try {
        setDisabled(true);
        const response = await signIn('email', {
          email: data.email,
          redirect: false,
        });
    
        if (response?.ok) {
            setToggleVerifyEmailPopup(true);
        } else {
          form.setError('email', {
            type: 'manual',
            message: response?.error || 'Erro ao enviar o e-mail de login.',
          });
        }
      } catch (err) {
        form.setError('email', {
          type: 'manual',
          message: 'Falha ao enviar o link de login.',
        });
      }
    };
    
  if(session.status === "authenticated") {
    router.push('/produtos')
    return;
  }

  return (
  <div className="w-full h-full md:min-h-screen min-h-[600px] flex flex-col">
    <div id="signin-header" className="w-full flex justify-between items-center text-center p-8">
      <button type="submit" className="text-black text-[20px] font-bold">
        Faça seu cadastro
      </button>
    </div>
    <div id="signin-body" className="flex-grow flex flex-col items-center justify-center text-center">
      <div className="md:max-w-[30%] w-[80%]">
        <h1 className="font-bold md:text-[52px] text-[32px]">Boas vindas!</h1>
        <p className="font-semibold mb-6 md:mb-12 md:text-[20px] text-[14px]">
          Entre utilizando seu e-mail, enviaremos um link para autenticação na plataforma
        </p>
        {toggleVerifyEmailPopup ? (
          <VerifyEmailCard/>
        ) : (
          <div className="flex flex-col space-y-4">
            <LoginInputForm form={form} onSubmit={onSubmit} disabled={disabled} />
            <GoogleSSOButton />
          </div>
        )}
      </div>
    </div>
    <Footer/>
  </div>
  )
}
