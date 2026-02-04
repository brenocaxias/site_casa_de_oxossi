'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

export async function excluirFilho(id: string) {
  // CRITICAL: O cliente para deletar usuários DO AUTH precisa usar a SERVICE_ROLE_KEY
  // Nunca use a NEXT_PUBLIC_SUPABASE_ANON_KEY para deletar usuários.
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Verifique este nome no seu .env ou Vercel
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  try {
    // 1. Remover o usuário do sistema de Autenticação (Auth)
    // Isso é o que causa o erro se a chave não for a Service Role.
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id)
    
    if (authError) {
      console.error("Erro Auth Admin:", authError.message)
      return { error: "Erro ao remover do sistema de login: " + authError.message }
    }

    // 2. Remover o perfil da tabela 'profiles'
    // (Geralmente o Supabase deleta em cascata, mas garantimos aqui)
    const { error: dbError } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', id)

    if (dbError) {
      console.error("Erro DB Profiles:", dbError.message)
      return { error: "Usuário removido do login, mas erro ao apagar perfil no banco." }
    }

    revalidatePath('/dashboard')
    return { success: true }

  } catch (error: any) {
    console.error("Erro geral na exclusão:", error)
    return { error: "Erro inesperado: " + error.message }
  }
}