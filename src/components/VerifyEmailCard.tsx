import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Timer } from 'lucide-react';

export const VerifyEmailCard = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-bold mb-2">Verifique o seu email</CardTitle>
        <CardDescription>Fizemos o envio de um e-mail de confirmação para você. Por favor, abra a sua caixa de entrada e clique no link de confirmação para acessar a sua conta.</CardDescription>
      </CardHeader>
      <CardContent className="flex space-x-2 text-green-600 justify-center">
        <Timer/>

      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Button disabled variant="outline">Reenviar</Button>
        <Button disabled variant="outline">Não recebi</Button>
      </CardFooter>
    </Card>
  )
}
