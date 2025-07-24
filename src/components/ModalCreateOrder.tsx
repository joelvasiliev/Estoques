"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Order } from '@/dto/order.dto';

import React, { Dispatch, SetStateAction } from "react";
import { Button } from './ui/button';
import { Label } from './ui/label';
import { AutocompleteProducts } from './AutocompleteProducts';
import { Input } from './ui/input';

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
            <div className="p-4">
              <div className="flex flex-col">
                <AutocompleteProducts
                  setNewOrder={setNewOrder}
                  newOrder={newOrder}
                />
                <Label htmlFor="amount" className="">
                  Quantidade
                </Label>
                <Input
                  className='border border-black text-black rounded-full'
                  placeholder='0'
                  value={Number(newOrder.amount) || 0}
                  onChange={(e) => setNewOrder({ ...newOrder, amount: Number(e.target.value) })}
                />
                <Label>
                  Tipo de unidade
                </Label>
                <Input
                  value={"fixo"}
                />
              </div>
            </div>
            <Button className='bg-black text-white' onClick={handleAddOrder}>Adicionar Pedido</Button>
          </DialogContent>
        </Dialog>
    )
}