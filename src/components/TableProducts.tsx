"use client"

import { Edit, Trash2 } from "lucide-react"
import router from "next/router"
import ConfirmDeleteModal from "./ConfirmDelete"
import { CTooltip } from "./Tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Product } from "@/dto/product.dto"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"

const formatType = (amount_type: string) => {
    switch (amount_type){
      case "unit":
        return "Unitário"
      case "grams":
        return "Gramas"
      case "liters":
        return "Litros"
      case "kilos":
        return "Quilos (Kg)"
    }
  }

export function TableProducts({
    products,
    handleConfirmDelete,
    openModals,
    setOpenModals,
    select_mode
}: {
    products: Product[],
    handleConfirmDelete: (a: any) => any
    openModals: any,
    setOpenModals: any
    select_mode?: boolean

}){
    return (
        <Table>
        <TableHeader>
          <TableRow className='text-center font-semibold'>
            {select_mode && <TableHead className='font-semibold'>Selecionar</TableHead>}
            <TableHead className='font-semibold'>Título</TableHead>
            <TableHead className='font-semibold'>Descrição</TableHead>
            <TableHead className='font-semibold'>Pedidos</TableHead>
            <TableHead className='font-semibold'>Para Entrega</TableHead>
            <TableHead className='font-semibold'>Finalizados</TableHead>
            <TableHead className='font-semibold'>Tipo</TableHead>
            <TableHead className='font-semibold'>Quantidade Restante</TableHead>
            <TableHead className='font-semibold'>Quantidade Total</TableHead>
            <TableHead className='font-semibold'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className='hover:bg-gray-400/20'>
              {select_mode && <TableCell className='w-[150px] text-wrap'><Checkbox/></TableCell>}
              <TableCell className='w-[150px] text-wrap'>{product.name}</TableCell>
              <TableCell className='w-[250px] text-wrap'>{product.description}</TableCell>
              <TableCell className='w-[150px] text-wrap'>{product.orders.length}</TableCell>
              <TableCell className='w-[150px] text-wrap'>{product.orders.length}</TableCell>
              <TableCell className='w-[150px] text-wrap'>{product.orders.length}</TableCell>
              <TableCell className='w-[125px] text-wrap'>{formatType(product.amount_type)}</TableCell>
              <TableCell className='w-[125px] text-wrap'>{product.amount}</TableCell>
              <TableCell className='w-[150px] text-wrap'>{product.amount}</TableCell>
              <TableCell>
              <CTooltip label='Editar'>
                <Button className='cursor-pointer' onClick={() => {router.push(`/produtos/produtos/${product.id}`)}} variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </CTooltip>
                <ConfirmDeleteModal
                  label={`Você tem certeza que deseja excluir o produto ${product.name}?`}
                  open={openModals[product.id] || false} 
                  setIsOpen={(open: boolean) => setOpenModals((prev: any) => ({ ...prev, [product.id]: open }))}
                  handleConfirmDelete={() => handleConfirmDelete(product.id)}
                >
                <CTooltip label='Deletar'>
                  <Button key={product.id} variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CTooltip>
                </ConfirmDeleteModal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}