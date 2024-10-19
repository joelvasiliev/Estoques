'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Plus, X, Save } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type Product = {
  id: string
  title: string
  description: string
  quantityType: 'gramas' | 'quilos' | 'litros' | 'unidade'
  quantity: number
  photos: string[]
  videos: string[]
}

export default function EditarProduto() {
    //TODO: criar um form e reaproveitar esse componente para tela de criação de produto também
    const {id} = useParams();
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [newPhotos, setNewPhotos] = useState<File[]>([])
    const [newVideos, setNewVideos] = useState<File[]>([])

    useEffect(() => {
        const fetchProduct = async () => {
            const res_product_by_id = await fetch(`/api/produtos/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const product = await res_product_by_id.json();
            console.log(product)
        
        setProduct(product)
        }
        fetchProduct()
    }, [id])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (product) {
        setProduct({ ...product, [e.target.name]: e.target.value })
        }
    }

    const handleSelectChange = (value: string) => {
        if (product) {
        setProduct({ ...product, quantityType: value as Product['quantityType'] })
        }
    }

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
        setNewPhotos(prevPhotos => [...prevPhotos, ...Array.from(e.target.files as FileList)])
        }
    }

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
        setNewVideos(prevVideos => [...prevVideos, ...Array.from(e.target.files as FileList)])
        }
    }

    const handleRemovePhoto = (index: number) => {
        if (product) {
        setProduct({
            ...product,
            photos: product.photos.filter((_, i) => i !== index)
        })
        }
    }

    const handleRemoveVideo = (index: number) => {
        if (product) {
        setProduct({
            ...product,
            videos: product.videos.filter((_, i) => i !== index)
        })
        }
    }

    const handleRemoveNewPhoto = (index: number) => {
        setNewPhotos(newPhotos.filter((_, i) => i !== index))
    }

    const handleRemoveNewVideo = (index: number) => {
        setNewVideos(newVideos.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try{
        e.preventDefault()
        console.log('Produto atualizado:', product)
        console.log('Novas fotos:', newPhotos)
        console.log('Novos vídeos:', newVideos)
        await fetch(`/api/produtos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product
            })
        }).then(() => {
            router.push('/painel')
        })
    }catch(e){
        console.error(e);
    }
    }

    if (!product) {
        return <div className="flex justify-center items-center h-screen">Carregando...</div>
    }

    return (
        <div className="container mx-auto p-4 h-full mt-20">
            <div className='w-full flex justify-between'>
                <h1 className="text-2xl font-bold mb-4">Editar Produto</h1>
                <X onClick={() => {router.push('/painel')}} className='cursor-pointer' size={32}/>
            </div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <Label htmlFor="title">Título</Label>
            <Input
                id="title"
                name="title"
                className='border border-black rounded-xl'
                value={product.title}
                onChange={handleInputChange}
                required
            />
            </div>
            <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea   
                className='rounded-xl'
                id="description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="grid grid-cols-1 gap-8">
            <div >
                <Label htmlFor="quantityType">Tipo de Quantidade</Label>
                <Select onValueChange={handleSelectChange} value={product.quantityType}>
                <SelectTrigger className='border rounded-xl border-black flex text-start justify-start'>
                    <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="gramas">Gramas</SelectItem>
                    <SelectItem value="quilos">Quilos</SelectItem>
                    <SelectItem value="litros">Litros</SelectItem>
                    <SelectItem value="unidade">Unidade</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                id="quantity"
                name="quantity"
                type="number"
                className='border border-black rounded-xl'
                value={product.quantity}
                onChange={handleInputChange}
                required
                />
            </div>
            </div>
            <div>
            <Label>Fotos</Label>
            <div className="flex flex-wrap gap-2 mt-2">
                {product.photos.map((photo, index) => (
                <div key={index} className="relative">
                    <Image src={photo} alt={`Produto ${index + 1}`} width={100} height={100} className="rounded" />
                    <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0"
                    onClick={() => handleRemovePhoto(index)}
                    >
                    <X className="h-4 w-4" />
                    </Button>
                </div>
                ))}
                {newPhotos.map((photo, index) => (
                <div key={`new-${index}`} className="relative">
                    <Image src={URL.createObjectURL(photo)} alt={`Nova foto ${index + 1}`} width={100} height={100} className="rounded" />
                    <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0"
                    onClick={() => handleRemoveNewPhoto(index)}
                    >
                    <X className="h-4 w-4" />
                    </Button>
                </div>
                ))}
                <label className="flex items-center justify-center w-[100px] h-[100px] border-2 border-dashed rounded cursor-pointer">
                <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                <Plus className="h-6 w-6" />
                </label>
            </div>
            </div>
            <div>
            <Label>Vídeos</Label>
            <div className="flex flex-wrap gap-2 mt-2">
                {product.videos.map((video, index) => (
                <div key={index} className="relative">
                    <video src={video} width={100} height={100} className="rounded" />
                    <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0"
                    onClick={() => handleRemoveVideo(index)}
                    >
                    <X className="h-4 w-4" />
                    </Button>
                </div>
                ))}
                {newVideos.map((video, index) => (
                <div key={`new-${index}`} className="relative">
                    <video src={URL.createObjectURL(video)} width={100} height={100} className="rounded" />
                    <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0"
                    onClick={() => handleRemoveNewVideo(index)}
                    >
                    <X className="h-4 w-4" />
                    </Button>
                </div>
                ))}
                <label className="flex items-center justify-center w-[100px] h-[100px] border-2 border-dashed rounded cursor-pointer">
                <input type="file" accept="video/*" multiple onChange={handleVideoUpload} className="hidden" />
                <Plus className="h-6 w-6" />
                </label>
            </div>
            </div>
            <Button type="submit" className="flex w-full space-x-2">
                <Save size={18} />
                <p className='font-bold'>Salvar Alterações</p>
            </Button>
        </form>
        </div>
    )
}