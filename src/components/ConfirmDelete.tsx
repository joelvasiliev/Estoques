'use client'

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

export default function ConfirmDeleteModal({label, children, open, setIsOpen, handleConfirmDelete}: { label: string, children: React.ReactNode, open: boolean, setIsOpen: any, handleConfirmDelete: any}) {

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangleIcon className="text-destructive" size={20} />
            Confirma?
          </DialogTitle>
          <DialogDescription>
            {label}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirmDelete}>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}