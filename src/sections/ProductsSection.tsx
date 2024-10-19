"use client"

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSession } from 'next-auth/react'
import DeleteProductModal from '@/components/ConfirmDeleteProduct'

type Product = {
  id: string
  name: string
  description: string
  amount_type: 'grams' | 'kilos' | 'liters' | 'unit'
  amount: number
  photo?: string
}

export function ProductsList() {
  const session = useSession();
  const [products, setProducts] = useState<Product[]>([])

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    amount_type: 'unit',
    amount: 0,
  })

  const handleAddProduct = async () => {
    setIsDialogOpen(false)
    if(!session.data?.user.email) return;
    const email = session.data.user.email;
    const res_user = await fetch(`/api/usuarios/email/${email}`)
    const user = await res_user.json();

    await fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newProduct.name,
        description: newProduct.description,
        amount_type: newProduct.amount_type,
        amount: newProduct.amount,
        owner_id: user.id
      })
    })
    fetchProducts();
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
    setIsDeleteModalOpen(false)
    fetchProducts();
  }

  

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Produtos</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
            </Button>
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
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Tipo de Quantidade</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.amount_type}</TableCell>
              <TableCell>{product.amount}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <DeleteProductModal
                  product_id={product.id}
                  open={isDeleteModalOpen}
                  setIsOpen={setIsDeleteModalOpen}
                  handleConfirmDelete={() => handleConfirmDelete(product.id)}
                >
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DeleteProductModal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}