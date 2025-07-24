import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSession } from 'next-auth/react'
import ConfirmDeleteModal from '@/components/ConfirmDelete'
import { CTooltip } from '@/components/Tooltip'
import { ModalCreateProduct } from '@/components/ModalCreateProduct'
import { Product } from '@/dto/product.dto'
import { useRouter } from 'next/navigation'
import { TableProducts } from '@/components/TableProducts'



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
  const [openModals, setOpenModals] = useState<Record<string, boolean>>({})
  

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    amount_type: 'grams',
    price_per: 'grams',
    total_cost: 0,
    price_per_unit: 0,
    amount: 0,
    orders: []
  })

  const handleAddProduct = async () => {
    try{
    setIsDialogOpen(false)
    console.log('1')
    // if(!session.data?.user.email) return;
    // const email = session.data.user.email;
    // const res_user = await fetch(`/api/usuarios/email/${email}`)
    const res_user = await fetch(`/api/usuarios/email/joel.vasiliev.neto@gmail.com`)
    const user = await res_user.json();
    const body = {
      name: newProduct.name,
      description: newProduct.description,
      amount_type: newProduct.amount_type,
      amount: newProduct.amount,
      total_cost: newProduct.total_cost,
      owner_id: user.id,
      price_per_unit: newProduct.price_per_unit,
      price_per: newProduct.price_per
    }
    console.log(body)
    await fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    await fetchProducts();
  }
  catch(e){
    console.error(e)
  }
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
    setOpenModals((prev) => ({ ...prev, [id]: false })) 
    fetchProducts();
  }

  

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Produtos</h1>
        <ModalCreateProduct
          handleAddProduct={handleAddProduct}
          isDialogOpen={isDialogOpen}
          newProduct={newProduct}
          setIsDialogOpen={setIsDialogOpen}
          setNewProduct={setNewProduct}
        >
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
          </Button>
        </ModalCreateProduct>
      </div>
      <TableProducts
        handleConfirmDelete={handleConfirmDelete}
        openModals={openModals}
        products={products}
        setOpenModals={setOpenModals}
      />
    </div>
  )
}
