'use server'

import { createServerSideClient } from '@/lib/supabase-server'
import { headers } from 'next/headers'

export async function solicitarRecuperacao(formData: FormData) {
  const email = formData.get('email') as string
  const origin = (await headers()).get('origin')

  // CORREÇÃO: Usamos o cliente que tem acesso aos cookies (para salvar o código PKCE)
  const supabase = await createServerSideClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/redefinir-senha`,
  })

  if (error) {
    console.error('Erro reset senha:', error)
    // Mesmo com erro, retornamos sucesso para não vazar emails cadastrados
    // (A menos que você queira debugar, aí pode retornar o erro)
  }

  return { success: true }
}