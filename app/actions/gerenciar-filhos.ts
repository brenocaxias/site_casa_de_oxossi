'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

// Cliente Admin necessário para deletar usuários do AUTH
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function excluirFilho(id: string) {
  // 1. Deleta do Auth (o que automaticamente deleta do profiles se houver Cascade, 
  // mas faremos manual para garantir)
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id)
  if (authError) return { error: "Erro ao remover do sistema de login." }

  // 2. Deleta da tabela profiles
  const { error: dbError } = await supabaseAdmin
    .from('profiles')
    .delete()
    .eq('id', id)

  if (dbError) return { error: "Erro ao remover dados do perfil." }

  revalidatePath('/dashboard')
  return { success: true }
}