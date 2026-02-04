'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schemaEdicao = z.object({
  id: z.string(),
  full_name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  email: z.string().email("E-mail inválido."),
})

export async function editarFilho(formData: FormData) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const rawData = {
    id: formData.get('id'),
    full_name: formData.get('full_name'),
    email: formData.get('email'),
  }

  const validacao = schemaEdicao.safeParse(rawData)
  if (!validacao.success) return { error: validacao.error.issues[0].message }

  const { id, full_name, email } = validacao.data

  try {
    // 1. Atualizar no Auth (Login e Metadados)
    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(id, {
      email: email,
      user_metadata: { full_name: full_name }
    })

    if (authError) throw authError

    // 2. Atualizar na tabela Profiles
    const { error: dbError } = await supabaseAdmin
      .from('profiles')
      .update({ full_name, email })
      .eq('id', id)

    if (dbError) throw dbError

    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    console.error("Erro na edição:", error)
    return { error: "Erro ao atualizar dados: " + error.message }
  }
}