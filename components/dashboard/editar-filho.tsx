'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Pencil, Loader2 } from 'lucide-react'
import { editarFilho } from '@/app/actions/editar-filho'
import { toast } from "sonner"

export function EditarFilho({ filho }: { filho: any }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const res = await editarFilho(formData)

    setLoading(false)
    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success("Dados do filho atualizados!")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
          <Pencil size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Editar Membro</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <input type="hidden" name="id" value={filho.id} />
          
          <div className="space-y-2">
            <Label htmlFor="full_name">Nome de Axé / Completo</Label>
            <Input id="full_name" name="full_name" defaultValue={filho.full_name} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail de Acesso</Label>
            <Input id="email" name="email" type="email" defaultValue={filho.email} required />
          </div>

          <DialogFooter className="pt-4">
            <Button type="submit" disabled={loading} className="w-full bg-primary">
              {loading ? <Loader2 className="animate-spin mr-2" /> : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}