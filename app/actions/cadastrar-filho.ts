'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'


// Esquema de validação apenas com os 3 campos que usas
const schemaCadastro = z.object({
  email: z.string().email("E-mail inválido."),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  // Telefone definido como opcional e aceitando null para evitar o erro de validação
  telefone: z.string().nullable().optional(),
})

export async function cadastrarFilho(formData: FormData) {
  // CORREÇÃO: Chame a função corretamente
  const supabase = await createClient()

  // Captura apenas o que vem do form
  const rawData = {
    email: formData.get('email'),
    senha: formData.get('senha'),
    nome: formData.get('nome'),
    telefone: null, // Como não tens no form, garantimos que vai como null
  }

  const validacao = schemaCadastro.safeParse(rawData)

  if (!validacao.success) {
    return { error: validacao.error.issues[0].message }
  }

  const { email, senha, nome, telefone } = validacao.data

  try {
    // 1. Criar utilizador no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: senha,
      email_confirm: true,
      user_metadata: { full_name: nome }
    })

    // Se o erro for de utilizador já existente, avisamos logo
    if (authError) {
      if (authError.message.includes("already been registered")) {
        return { error: "Este e-mail já está registado no sistema." }
      }
      throw authError
    }

    if (!authData.user) throw new Error("Erro ao criar utilizador no Auth.")

    // 2. Inserir na tabela 'filhos'
    const { error: dbError } = await supabase
      .from('filhos')
      .insert({
        id: authData.user.id,
        nome,
        email,
        telefone, // Vai como null sem quebrar o Zod
        role: 'filho'
      })

    if (dbError) {
      // Opcional: Se falhar aqui, podes apagar o utilizador do Auth para permitir tentar de novo
      // await supabase.auth.admin.deleteUser(authData.user.id)
      console.error("Erro na BD:", dbError)
      return { error: "Utilizador criado, mas erro ao guardar perfil. Contacte o suporte." }
    }

    revalidatePath('/dashboard')
    return { success: true }

  } catch (error: any) {
    console.error("Erro geral:", error)
    return { error: error.message || "Erro interno ao cadastrar." }
  }
}