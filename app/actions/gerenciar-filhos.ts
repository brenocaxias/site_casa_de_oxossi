'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

export async function excluirFilho(id: string) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  try {
    // 1. Deletar AGENDAMENTOS vinculados (Causa comum do erro)
    // Se você não fizer isso, o banco bloqueia a exclusão por segurança
    const { error: agendamentosError } = await supabaseAdmin
      .from('agendamentos')
      .delete()
      .eq('user_id', id)

    if (agendamentosError) {
      console.error("Erro ao limpar agendamentos:", agendamentosError)
    }

    // 2. Deletar o PERFIL da tabela 'profiles'
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', id)

    if (profileError) {
      console.error("Erro ao apagar perfil:", profileError)
      // Se houver erro aqui, provavelmente é outra tabela vinculada (como 'artigos')
    }

    // 3. POR ÚLTIMO, remover do sistema de Login (Auth)
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id)
    
    if (authError) {
      console.error("Erro Auth Admin:", authError.message)
      return { error: "Erro ao remover do login: " + authError.message }
    }

    revalidatePath('/dashboard')
    return { success: true }

  } catch (error: any) {
    console.error("Erro geral na exclusão:", error)
    return { error: "Erro inesperado: " + error.message }
  }
}