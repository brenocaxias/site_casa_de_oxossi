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
  DialogFooter
} from "@/components/ui/dialog"
import { KeyRound, Loader2 } from 'lucide-react'
import { alterarSenha } from '@/app/actions/alterar-senha'

export function BotaoAlterarSenha() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    // Chama a server action criada no passo 1
    const res = await alterarSenha(null, formData)

    setLoading(false)

    if (res?.error) {
      alert(res.error)
    } else if (res?.success) {
      alert(res.success)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Alterar Minha Senha" className="text-slate-500 hover:text-primary hover:bg-slate-100">
          <KeyRound size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <KeyRound className="h-5 w-5" /> Alterar Senha
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="novaSenha">Nova Senha</Label>
            <Input 
              id="novaSenha" 
              name="novaSenha" 
              type="password" 
              placeholder="Mínimo 6 caracteres" 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
            <Input 
              id="confirmarSenha" 
              name="confirmarSenha" 
              type="password" 
              placeholder="Digite novamente" 
              required 
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Salvar Nova Senha'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}