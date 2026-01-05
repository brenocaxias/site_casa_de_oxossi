'use server'

import { createClient } from '@supabase/supabase-js'

export async function cadastrarFilho(formData: FormData) {
  const nome = formData.get('nome') as string
  const email = formData.get('email') as string
  const senha = formData.get('senha') as string

  // 1. Criar cliente com a Chave Mestra (Service Role)
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

  // 2. Criar o Usuário na Autenticação
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: senha,
    email_confirm: true
  })

  if (authError) {
    return { error: 'Erro ao criar login: ' + authError.message }
  }

  if (!authData.user) {
    return { error: 'Erro desconhecido ao criar usuário.' }
  }

  // 3. Criar ou Atualizar o Perfil (UPSERT resolve o erro de duplicação)
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .upsert({
      id: authData.user.id,
      full_name: nome,
      role: 'user',
      email: email
    })

  if (profileError) {
    return { error: 'Usuário criado, mas erro ao salvar perfil: ' + profileError.message }
  }

  return { success: true }
}