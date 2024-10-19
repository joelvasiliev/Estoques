'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangleIcon } from "lucide-react"

export default function DeleteProductModal({product_id, children, open, setIsOpen, handleConfirmDelete}: {product_id: string, children: React.ReactNode, open: boolean, setIsOpen: any, handleConfirmDelete: any}) {

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangleIcon className="text-destructive" size={20} />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the product? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={() => {handleConfirmDelete(product_id)}}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}