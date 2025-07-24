import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Product } from '@/dto/product.dto';

import React, { Dispatch, SetStateAction } from "react";
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';

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
                <Label htmlFor="name" className="text-right">
                  Título
                </Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="col-span-3 border rounded-3xl"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descrição
                </Label>
                <Input
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="col-span-3 border rounded-3xl"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="total_cost" className="text-right" >
                  Custo
                </Label>
                <Input
                  id="total_cost"
                  type='number'
                  value={newProduct.total_cost}
                  onChange={(e) => setNewProduct({ ...newProduct, total_cost: Number(e.target.value) })}
                  className="col-span-3 border rounded-3xl"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount_type" className="text-right">
                  Tipo de Quantidade
                </Label>
                <Select
                  onValueChange={(value) => setNewProduct({ ...newProduct, amount_type: value as Product['amount_type'] })}
                  value={newProduct.amount_type}
                >
                  <SelectTrigger className="col-span-3 border rounded-3xl">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grams">Gramas</SelectItem>
                    <SelectItem value="kilos">Quilos</SelectItem>
                    <SelectItem value="liters">Litros</SelectItem>
                    <SelectItem value="unit">Unidade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Quantidade
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newProduct.amount}
                  onChange={(e) => setNewProduct({ ...newProduct, amount: Number(e.target.value) })}
                  className="col-span-3 border rounded-3xl"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount_type" className="text-right">
                  Preço por
                </Label>
                <Select
                  onValueChange={(value) => setNewProduct({ ...newProduct, amount_type: value as Product['amount_type'] })}
                  value={newProduct.price_per}
                >
                  <SelectTrigger className="col-span-3 border rounded-3xl">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grams">Gramas</SelectItem>
                    <SelectItem value="kilos">Quilos</SelectItem>
                    <SelectItem value="liters">Litros</SelectItem>
                    <SelectItem value="unit">Unidade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Preço
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={Number(newProduct.price_per_unit)}
                  onChange={(e) => setNewProduct({ ...newProduct, price_per_unit: Number(e.target.value) })}
                  className="col-span-3 border rounded-3xl"
                />
              </div>
            </div>
            <Button className='bg-black text-white' onClick={handleAddProduct}>Adicionar Produto</Button>
          </DialogContent>
        </Dialog>
    )
}