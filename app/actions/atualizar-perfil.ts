'use server'

import { createServerSideClient } from '@/lib/supabase-server' // Ajustado para o nome correto que você usa
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schemaPerfil = z.object({
  full_name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  telefone: z.string().optional().nullable(),
})

export async function atualizarPerfil(formData: FormData) {
  const supabase = await createServerSideClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "Não autorizado" }

  const rawData = {
    full_name: formData.get('full_name'),
    telefone: formData.get('telefone'),
  }

  const validacao = schemaPerfil.safeParse(rawData)
  if (!validacao.success) return { error: validacao.error.issues[0].message }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: validacao.data.full_name,
      telefone: validacao.data.telefone,
    })
    .eq('id', user.id)

  if (error) {
    console.error("Erro Supabase:", error.message)
    return { error: "Erro ao salvar: " + error.message }
  }

  revalidatePath('/', 'layout') 
  revalidatePath('/dashboard')
  
  return { success: true }
}