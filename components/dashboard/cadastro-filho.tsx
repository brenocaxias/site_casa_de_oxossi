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
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { UserPlus, Loader2, Mail, Lock, User as UserIcon } from 'lucide-react'
import { cadastrarFilho } from '@/app/actions/cadastrar-filho'
import { toast } from "sonner"

export function CadastroFilho() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await cadastrarFilho(formData)

      if (res?.error) {
        toast.error(res.error)
      } else {
        toast.success('Filho de santo cadastrado com sucesso!')
        setOpen(false)
      }
    } catch (error) {
      toast.error("Ocorreu um erro inesperado.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-sm transition-all hover:scale-105">
          <UserPlus size={18} /> Cadastrar Filho
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white border border-slate-200 shadow-xl rounded-xl">
        <DialogHeader className="border-b pb-4 mb-4">
          <DialogTitle className="flex items-center gap-2 text-xl text-primary font-bold">
            <UserPlus className="h-6 w-6" /> Novo Filho da Casa
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Preencha os dados abaixo para criar o acesso ao sistema.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-slate-700 font-medium">Nome do Filho (Axé)</Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                id="nome" 
                name="nome" 
                placeholder="Ex: João de Ogum" 
                required 
                className="pl-9 bg-slate-50 border-slate-300 focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-medium">Email de Acesso</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="exemplo@email.com" 
                required 
                className="pl-9 bg-slate-50 border-slate-300 focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha" className="text-slate-700 font-medium">Senha Inicial</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                id="senha" 
                name="senha" 
                type="text" 
                placeholder="Mínimo 6 caracteres" 
                required 
                className="pl-9 bg-slate-50 border-slate-300 focus:border-primary"
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="mr-auto">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-white font-semibold min-w-[140px]">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Criando...
                </>
              ) : (
                'Criar Cadastro'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}