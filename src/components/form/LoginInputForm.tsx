import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoginFormValues } from "@/sections/WelcomeSection"
import { UseFormReturn } from "react-hook-form"

export const LoginInputForm = ({form, onSubmit, disabled}: {form: UseFormReturn<LoginFormValues>, onSubmit: any, disabled: boolean}) => {
  return (
    <div className="flex">
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <Label className="flex justify-start w-full font-semibold">Email</Label>
            <Input type="email" placeholder="Digite seu e-mail" required {...form.register('email')}/>

            <Button disabled={disabled} type="submit" className="mt-16  w-full text-white">
                Entrar
            </Button>
        </form>
    </div>
  )
}
