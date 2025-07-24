"use client"

import { Product } from "@/dto/product.dto";
import { useEffect, useState } from "react";
import { Order } from "@/dto/order.dto";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CheckIcon } from "lucide-react";
import { Button } from "./ui/button";
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";

export function AutocompleteProducts({
    newOrder,
    setNewOrder
}: {
    newOrder: Omit<Order, "id">,
    setNewOrder: React.Dispatch<React.SetStateAction<Omit<Order, "id">>>
}){
    const [products, setProducts] = useState<Product[]>([]);
    const [productName, setProductName] = useState("");
    const [openSugestions, setOpenSugestions] = useState(false);
    const [clickedProduct, setClickedProduct] = useState(false);

    const fetchProducts = async () => {
        const res = await fetch('/api/produtos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const products = await res.json();
        setProducts(products)
        return products;
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    const handleChange = async (e: any) => {
        setProductName(e.target.name);
        setClickedProduct(false);
        if(e === "") return;
        setOpenSugestions(true);
        const products = await fetchProducts();
        const text = productName;

        const filtered_products = products.filter((p: Product) => p.name.toLowerCase().trim().includes(text));
        setProducts(filtered_products);
    }

    return (
        <Popover open={openSugestions} onOpenChange={setOpenSugestions}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openSugestions}
              className="w-[200px] justify-between"
            >
              Select
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search product..." className="h-9" />
              <CommandList>
                <CommandEmpty>Sem resultados</CommandEmpty>
                <CommandGroup>
                  {products.length > 0 && products.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={product.name || ""}
                      onChange={handleChange}
                      onSelect={handleChange}
                    >
                      {product.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          productName === product.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )
}