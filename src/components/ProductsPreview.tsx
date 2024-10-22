"use client"

import { Product } from "@/dto/product.dto";
import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { TableProducts } from "./TableProducts";

export function ProductsPreview({
    select_mode
}: {
    select_mode?: boolean
}){

    const fetchProducts = async () => {
        try {
          const res = await fetch('/api/produtos', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (res.ok) {
            const data = await res.json();
            setProducts(data);
          } else {
            console.error("Failed to fetch products", res.statusText);
          }
        } catch (error) {
          console.error("An error occurred while fetching products", error);
        }
      };


    const [openModals, setOpenModals] = useState<Record<string, boolean>>({})

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
        setOpenModals((prev) => ({ ...prev, [id]: false })) 
        fetchProducts();
      }

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/produtos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (data) => {
            const products = await data.json()
            setProducts(products);
        })
    }, [])

    return (
    <div className="w-full p-4 rounded-3xl h-[50%] flex flex-col text-center">
        <h1 className="font-bold text-[20px] ml-20">Pedidos</h1>
        <div className="w-full flex flex-col items-center mt-8">
            <SearchBar label="Busque produtos aqui"/>
            <div className="flex items-start text-start mt-4">
                <TableProducts
                    select_mode
                    products={products}
                    handleConfirmDelete={handleConfirmDelete}
                    openModals={openModals}
                    setOpenModals={setOpenModals}
                />
            </div>
        </div>
    </div>
    )
}