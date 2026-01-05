'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowLeft, Mail, CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { solicitarRecuperacao } from '@/app/actions/solicitar-recuperacao'

export default function EsqueciSenhaPage() {
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    await solicitarRecuperacao(formData)
    
    // Sempre mostramos sucesso por segurança (para não revelar quais emails existem)
    setSucesso(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/login" className="text-sm text-slate-500 hover:text-primary flex items-center gap-1">
               <ArrowLeft size={16} /> Voltar
            </Link>
          </div>
          <CardTitle className="text-2xl text-primary">Recuperar Acesso</CardTitle>
          <CardDescription>
            Digite o e-mail cadastrado e enviaremos um link para você redefinir sua senha.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {sucesso ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center text-green-800">
               <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-600" />
               <p className="font-bold mb-2">Verifique seu e-mail!</p>
               <p className="text-sm">Se o e-mail estiver cadastrado, você receberá um link para criar uma nova senha em instantes.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Seu E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="exemplo@email.com" 
                    className="pl-9" 
                    required 
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : 'Enviar Link de Recuperação'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}