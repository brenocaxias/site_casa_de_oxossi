'use server'

import { createServerSideClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function atualizarStatusAgendamento(id: number, novoStatus: 'confirmado' | 'cancelado') {
  const supabase = await createServerSideClient()

  // Atualiza o status no banco de dados
  const { error } = await supabase
    .from('agendamentos')
    .update({ status: novoStatus })
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar status:', error)
    throw new Error('Falha ao atualizar agendamento')
  }

  // Isso faz a tela atualizar sozinha (sem precisar dar F5) para mostrar a nova cor do status
  revalidatePath('/dashboard')
}