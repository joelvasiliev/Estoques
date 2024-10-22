import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Order } from '@/dto/order.dto';

import React, { Dispatch, SetStateAction } from "react";
import { Button } from './ui/button';

type ModalCreateOrderProps = {
    children: React.ReactNode;
    isDialogOpen: boolean, 
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>, 
    newOrder: Omit<Order, "id">, 
    setNewOrder:Dispatch<SetStateAction<Omit<Order, "id">>> , 
    handleAddOrder: (p: any) => (any);
}

export function ModalCreateOrder({children, isDialogOpen, setIsDialogOpen, newOrder, setNewOrder, handleAddOrder}: ModalCreateOrderProps){
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            {children}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Pedido</DialogTitle>
              <DialogDescription>
                Preencha os detalhes do novo pedido abaixo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Título
                </label>
                </div>
            </div>
            <Button className='bg-black text-white' onClick={handleAddOrder}>Adicionar Pedido</Button>
          </DialogContent>
        </Dialog>
    )
}