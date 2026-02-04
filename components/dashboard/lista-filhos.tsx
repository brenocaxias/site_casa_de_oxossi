'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, User, Mail, MoreHorizontal } from 'lucide-react'
import { excluirFilho } from '@/app/actions/gerenciar-filhos'
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function ListaFilhos({ filhos }: { filhos: any[] }) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleExcluir = async (id: string) => {
    setLoading(id)
    const res = await excluirFilho(id)
    setLoading(null)

    if (res.error) toast.error(res.error)
    else toast.success("Membro removido da casa.")
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>Filho(a)</TableHead>
            <TableHead className="hidden md:table-cell">E-mail</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filhos.map((filho) => (
            <TableRow key={filho.id} className="hover:bg-slate-50/50">
              <TableCell className="font-medium flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User size={14} />
                </div>
                {filho.full_name}
              </TableCell>
              <TableCell className="hidden md:table-cell text-slate-500 text-sm">
                {filho.email}
              </TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      <Trash2 size={18} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Expulsar da casa virtual?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Isso removerá o acesso de <b>{filho.full_name}</b> permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleExcluir(filho.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Confirmar Remoção
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}