'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Phone, Mail, Loader2, ArrowLeft } from 'lucide-react'
import { atualizarPerfil } from '@/app/actions/atualizar-perfil'
import { toast } from "sonner"
import Link from 'next/link'
// MUDANÇA AQUI: Importando o cliente padrão
import { supabase } from '@/lib/supabase' 

export default function PerfilPage() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [dados, setDados] = useState({ full_name: '', email: '', telefone: '' })

  useEffect(() => {
    async function carregarDados() {
      // Usando o objeto 'supabase' diretamente conforme exportado na sua lib
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { data: perfil } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        if (perfil) {
          setDados({
            full_name: perfil.full_name || '',
            email: perfil.email || user.email || '',
            telefone: perfil.telefone || ''
          })
        }
      }
      setFetching(false)
    }
    carregarDados()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const res = await atualizarPerfil(formData)
    setLoading(false)

    if (res?.error) toast.error(res.error)
    else toast.success("Perfil atualizado com sucesso!")
  }

  if (fetching) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="animate-spin text-primary h-8 w-8" />
      <p className="text-slate-500 mt-2">Carregando seus dados...</p>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl animate-in fade-in duration-500">
      <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-primary mb-6 transition-colors group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
        Voltar ao Dashboard
      </Link>

      <Card className="shadow-xl border-slate-200 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b pb-8">
          <CardTitle className="text-2xl text-primary flex items-center gap-2">
            <User className="text-secondary h-6 w-6" /> Meu Perfil
          </CardTitle>
          <CardDescription>Mantenha seus dados de axé atualizados para a casa.</CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold">Nome Completo (ou de Axé)</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input name="full_name" defaultValue={dados.full_name} className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-bold">E-mail de Acesso</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input value={dados.email} className="pl-9 bg-slate-100 border-slate-200 cursor-not-allowed" disabled />
              </div>
              <p className="text-[10px] text-slate-400 italic font-medium">O e-mail é a sua identidade de login e não pode ser alterado.</p>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-bold">WhatsApp / Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input name="telefone" defaultValue={dados.telefone} placeholder="(00) 00000-0000" className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all" />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 shadow-lg hover:shadow-primary/20 transition-all" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" /> Salvando...
                </>
              ) : "Salvar Alterações"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}