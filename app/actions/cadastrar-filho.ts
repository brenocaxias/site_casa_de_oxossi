'use server'

import { createClient } from '@supabase/supabase-js'

export async function cadastrarFilho(formData: FormData) {
  const nome = formData.get('nome') as string
  const email = formData.get('email') as string
  const senha = formData.get('senha') as string

  // 1. Criar cliente com a Chave Mestra (Service Role)
  // Isso permite criar usuários sem estar logado como eles
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

  // 2. Criar o Usuário na Autenticação (Email/Senha)
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: senha,
    email_confirm: true // Já confirma o email automaticamente
  })

  if (authError) {
    return { error: 'Erro ao criar login: ' + authError.message }
  }

  if (!authData.user) {
    return { error: 'Erro desconhecido ao criar usuário.' }
  }

  // 3. Criar o Perfil na tabela 'profiles' (Para aparecer o nome "Bem-vindo Fulano")
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .insert({
      id: authData.user.id,
      full_name: nome,
      role: 'user', // Define como filho (usuário comum)
      email: email
    })

  if (profileError) {
    return { error: 'Usuário criado, mas erro ao salvar perfil: ' + profileError.message }
  }

  return { success: true }
}