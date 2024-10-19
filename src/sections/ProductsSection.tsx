import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSession } from 'next-auth/react'
import DeleteProductModal from '@/components/ConfirmDeleteProduct'
import { CTooltip } from '@/components/Tooltip'
import { ModalCreateProduct } from '@/components/ModalCreateProduct'
import { Product } from '@/dto/product.dto'
import { useRouter } from 'next/navigation'



export function ProductsList() {
  const router = useRouter();
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
    console.log(id)
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
      <Table>
        <TableHeader>
          <TableRow className='text-center'>
            <TableHead>ID</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className='hover:bg-gray-400/20'>
              <TableCell className='max-w-[200px]'>{product.id}</TableCell>
              <TableCell className='w-[150px] text-wrap'>{product.name}</TableCell>
              <TableCell className='w-[250px] text-wrap'>{product.description}</TableCell>
              <TableCell className='w-[125px] text-wrap'>{formatType(product.amount_type)}</TableCell>
              <TableCell className='w-[150px] text-wrap text-center'>{product.amount}</TableCell>
              <TableCell>
              <CTooltip label='Editar'>
                <Button className='cursor-pointer' onClick={() => {router.push(`/painel/produtos/${product.id}`)}} variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </CTooltip>
                <DeleteProductModal
                  product={product}
                  open={openModals[product.id] || false} 
                  setIsOpen={(open: boolean) => setOpenModals((prev) => ({ ...prev, [product.id]: open }))}
                  handleConfirmDelete={() => handleConfirmDelete(product.id)}
                >
                <CTooltip label='Deletar'>
                  <Button key={product.id} variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CTooltip>
                </DeleteProductModal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
