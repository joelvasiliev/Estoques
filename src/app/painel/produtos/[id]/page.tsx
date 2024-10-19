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
import { useForm, useWatch } from 'react-hook-form'

type Product = {
  id: string
  title: string
  description: string
  amount_type: 'gramas' | 'quilos' | 'litros' | 'unidade'
  amount: number
  photos: string[]
  videos: string[]
}

export default function EditarProduto() {
    const {id} = useParams();
    const router = useRouter()

    const form = useForm({
        defaultValues: {
            product: {
                title: '',
                description: '',
                amount: 0,
                amount_type: 'unit',
                photos: [],
                videos: []
            }
        }
    })

    const product = useWatch({
        control: form.control,
        name: 'product'
    })
    const title = useWatch({
        control: form.control,
        name: 'product.title'
    })

    const description = useWatch({
        control: form.control,
        name: 'product.description'
    })
    const amount = useWatch({
        control: form.control,
        name: 'product.amount'
    })
    const amount_type = useWatch({
        control: form.control,
        name: 'product.amount_type'
    })
    const photos = useWatch({
        control: form.control,
        name: 'product.photos'
    })
    const videos = useWatch({
        control: form.control,
        name: 'product.videos'
    })

    useEffect(() => {
        const fetchProduct = async () => {
            const res_product_by_id = await fetch(`/api/produtos/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

        const product = await res_product_by_id.json();
        
        form.setValue("product.title", product.title)
        form.setValue("product.description", product.description)
        form.setValue("product.amount", product.amount)
        form.setValue("product.amount_type", product.amount_type)
        form.setValue("product.photos", product.photos)
        form.setValue("product.videos", product.videos)
        }
        fetchProduct()
    }, [form, id])

    const handleSelectChange = (
        form_label: "title" | "description" | "amount" | "amount_type" | "photos" | "videos",
        value: string
    ) => {
        form.setValue(form_label, value as Product['amount_type'])
    }

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // upload para api do catbox
            // atualizar form
        }
    }

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // upload para api do catbox
            // atualizar form
        }
    }

    const handleRemovePhoto = (index: number) => {
    }

    const handleRemoveVideo = (index: number) => {
    }

    const handleRemoveNewPhoto = (index: number) => {
    }

    const handleRemoveNewVideo = (index: number) => {
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try{
        e.preventDefault()
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
                {...form.register('title')}
                id="title"
                name="title"
                className='border border-black rounded-xl'
                value={title}
                onChange={handleInputChange}
                required
            />
            </div>
            <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea   
                className='rounded-xl'
                id="description"
                {...form.register('description')}
                name="description"
                value={description}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="grid grid-cols-1 gap-8">
            <div >
                <Label htmlFor="amount_type">Tipo de Quantidade</Label>
                <Select onValueChange={(e: any) => handleSelectChange("amount_type", e)} value={amount_type}>
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
                <Label htmlFor="amount">Quantidade</Label>
                <Input
                    {...form.register('amount')}
                    id="amount"
                    name="amount"
                    type="number"
                    className='border border-black rounded-xl'
                    value={amount}
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