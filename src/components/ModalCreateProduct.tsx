import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Product } from '@/dto/product.dto';

import React, { Dispatch, SetStateAction } from "react";
import { Button } from './ui/button';

type ModalCreateProductProps = {
    children: React.ReactNode;
    isDialogOpen: boolean, 
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>, 
    newProduct: Omit<Product, "id">, 
    setNewProduct:Dispatch<SetStateAction<Omit<Product, "id">>> , 
    handleAddProduct: (p: any) => (any);
}

export function ModalCreateProduct({children, isDialogOpen, setIsDialogOpen, newProduct, setNewProduct, handleAddProduct}: ModalCreateProductProps){
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            {children}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Produto</DialogTitle>
              <DialogDescription>
                Preencha os detalhes do novo produto abaixo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Título
                </label>
                <input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right">
                  Descrição
                </label>
                <input
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="amount_type" className="text-right">
                  Tipo de Quantidade
                </label>
                <select
                  id="amount_type"
                  value={newProduct.amount_type}
                  onChange={(e) => setNewProduct({ ...newProduct, amount_type: e.target.value as Product['amount_type'] })}
                  className="col-span-3"
                >
                  <option value="grams">Gramas</option>
                  <option value="kilos">Quilos</option>
                  <option value="liters">Litros</option>
                  <option value="unit">Unidade</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="amount" className="text-right">
                  Quantidade
                </label>
                <input
                  id="amount"
                  type="number"
                  value={newProduct.amount}
                  onChange={(e) => setNewProduct({ ...newProduct, amount: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button className='bg-black text-white' onClick={handleAddProduct}>Adicionar Produto</Button>
          </DialogContent>
        </Dialog>
    )
}