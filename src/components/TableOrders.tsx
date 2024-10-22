"use client"

import { Edit, Trash2 } from "lucide-react"
import router from "next/router"
import ConfirmDeleteModal from "./ConfirmDelete"
import { CTooltip } from "./Tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Order } from "@/dto/order.dto"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"

export function TableOrders({
    orders,
    handleConfirmDelete,
    openModals,
    setOpenModals,
    select_mode
}: {
    orders: Order[],
    handleConfirmDelete: (a: any) => any
    openModals: any,
    setOpenModals: any
    select_mode?: boolean

}){
    return (
        <Table>
        <TableHeader>
          <TableRow className='text-center font-semibold'>
            {select_mode && <TableHead className='w-[50px] font-semibold'>Selecionar</TableHead>}
            <TableHead className='w-[120px] font-semibold'>Produto</TableHead>
            <TableHead className='w-[120px] font-semibold'>Data</TableHead>
            <TableHead className='w-[100px] font-semibold'>Status</TableHead>
            <TableHead className='w-[100px] font-semibold'>Comprador</TableHead>
            <TableHead className='w-[100px] font-semibold'>Entregador</TableHead>
            <TableHead className='w-[40px] font-semibold'>Quantidade</TableHead>
            <TableHead className='w-[60px] font-semibold'>Valor Pago</TableHead>
            <TableHead className='w-[60px] font-semibold'>Lucro</TableHead>
            <TableHead className='w-[100px] font-semibold'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className='hover:bg-gray-400/20'>
              {select_mode && <TableCell className=' text-wrap'><Checkbox/></TableCell>}
              <TableCell className=' text-wrap'>{""}</TableCell>
              <TableCell className='w-[250px] text-wrap'>{""}</TableCell>
              <TableCell className=' text-wrap'>{""}</TableCell>
              <TableCell className=' text-wrap'>{""}</TableCell>
              <TableCell className=' text-wrap'>{""}</TableCell>
              <TableCell className='w-[125px] text-wrap'>{""}</TableCell>
              <TableCell className=' text-wrap'>{""}</TableCell>
              <TableCell className=' text-wrap'>{""}</TableCell>
              <TableCell className=' text-wrap'>{""}</TableCell>
              <TableCell>
              <CTooltip label='Editar'>
                <Button className='cursor-pointer' onClick={() => {router.push(`/produtos/produtos/${order.id}`)}} variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </CTooltip>
                <ConfirmDeleteModal
                  label={`Você tem certeza que deseja excluir o pedido ${order.id}?`}
                  open={openModals[order.id] || false} 
                  setIsOpen={(open: boolean) => setOpenModals((prev: any) => ({ ...prev, [order.id]: open }))}
                  handleConfirmDelete={() => handleConfirmDelete(order.id)}
                >
                <CTooltip label='Deletar'>
                  <Button key={order.id} variant="ghost" size="icon">
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