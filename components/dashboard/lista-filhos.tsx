'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, User, Loader2 } from 'lucide-react'
import { excluirFilho } from '@/app/actions/gerenciar-filhos'
import { EditarFilho } from '@/components/dashboard/editar-filho' // Importando o novo componente
import { toast } from "sonner"

export function ListaFilhos({ filhos }: { filhos: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleExcluir = async (id: string, nome: string) => {
    // Substituímos o AlertDialog pelo confirm nativo para evitar erro de compilação
    const confirmacao = window.confirm(
      `Tem certeza que deseja remover ${nome} da casa? Esta ação não pode ser desfeita.`
    )
    
    if (!confirmacao) return

    setLoadingId(id)
    try {
      const res = await excluirFilho(id)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success(`${nome} foi removido com sucesso.`)
      }
    } catch (error) {
      toast.error("Erro ao processar a exclusão.")
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[250px]">Filho(a)</TableHead>
            <TableHead className="hidden md:table-cell">E-mail de Acesso</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filhos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-10 text-slate-400 italic">
                Nenhum filho cadastrado até o momento.
              </TableCell>
            </TableRow>
          ) : (
            filhos.map((filho) => (
              <TableRow key={filho.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <User size={16} />
                  </div>
                  <span className="truncate">{filho.full_name || 'Sem nome'}</span>
                </TableCell>
                <TableCell className="hidden md:table-cell text-slate-500 text-sm">
                  {filho.email}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {/* Componente de Edição */}
                    <EditarFilho filho={filho} />

                    {/* Botão de Exclusão */}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleExcluir(filho.id, filho.full_name)}
                      disabled={loadingId === filho.id}
                      title="Excluir Filho"
                    >
                      {loadingId === filho.id ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}