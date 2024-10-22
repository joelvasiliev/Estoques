"use client"

import React, { useEffect, useState } from "react";
import {Sidebar} from "../../components/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Order } from "@/dto/order.dto";
import { TableOrders } from "@/components/TableOrders";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ModalCreateOrder } from "@/components/ModalCreateOrder";

export default function Page(){
    const session = useSession();
    const router = useRouter();
    if(!session) router.push('/');

    const [orders, setOrders] = useState<Order[]>([]);
    const [openModal, setOpenModal] = useState<Record<string, boolean>>({})
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newOrder, setNewOrder] = useState<Omit<Order, 'id'>>({
        amount: 0,
        created_at: new Date(Date.now()),
        delivered: false,
        payment_type: '',
        product_id: '',
        status: '',
        user_id: '',
        courier_id: '',
      })

    const fetchOrders = () => {
        fetch('/api/pedidos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            const data = await res.json()
            setOrders(data);
        })
    }

    const handleConfirmDelete = async (id: string) => {
        await fetch('/api/produtos', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        })
        setOpenModal((prev) => ({ ...prev, [id]: false })) 
        fetchOrders();
      }

    useEffect(() => {
        fetchOrders()
    }, [])

    const handleAddOrder = async () => {

    }

    if(session)
    return (
        <div className="flex w-full h-screen p-2">
            <Sidebar/>
            <div className="flex flex-col w-full h-full p-4">
                <div className="flex w-full justify-between">
                    <h1 className="font-bold text-[20px] ml-12 mb-8">Vendas</h1>
                    <ModalCreateOrder
                        handleAddOrder={handleAddOrder}
                        isDialogOpen={isDialogOpen}
                        setIsDialogOpen={setIsDialogOpen}
                        newOrder={newOrder}
                        setNewOrder={setNewOrder}
                    >
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Adicionar Pedido
                        </Button>
                    </ModalCreateOrder>
                </div>
                <TableOrders
                    orders={orders}
                    handleConfirmDelete={handleConfirmDelete}
                    openModals={openModal}
                    setOpenModals={setOpenModal}
                />
            </div>
        </div>
    )
}