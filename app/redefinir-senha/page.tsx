'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Lock, Loader2 } from 'lucide-react'
import { alterarSenha } from '@/app/actions/alterar-senha' // Reusando a ação anterior

export default function RedefinirSenhaPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const res = await alterarSenha(null, formData)

    if (res?.error) {
      alert(res.error)
      setLoading(false)
    } else {
      alert('Senha alterada com sucesso!')
      router.push('/dashboard') // Manda ele para o painel
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center gap-2">
            <Lock className="h-5 w-5" /> Criar Nova Senha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="novaSenha">Nova Senha</label>
              <Input name="novaSenha" type="password" placeholder="Mínimo 6 caracteres" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
              <Input name="confirmarSenha" type="password" placeholder="Repita a senha" required />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary text-white">
              {loading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Salvar e Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}