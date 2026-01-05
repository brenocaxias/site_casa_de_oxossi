'use server'

import { createServerSideClient } from '@/lib/supabase-server'

export async function alterarSenha(prevState: any, formData: FormData) {
  const novaSenha = formData.get('novaSenha') as string
  const confirmarSenha = formData.get('confirmarSenha') as string

  if (novaSenha.length < 6) {
    return { error: 'A senha deve ter pelo menos 6 caracteres.' }
  }

  if (novaSenha !== confirmarSenha) {
    return { error: 'As senhas não coincidem.' }
  }

  // Pega o cliente do usuário logado atual
  const supabase = await createServerSideClient()

  // Atualiza a senha do usuário autenticado
  const { error } = await supabase.auth.updateUser({
    password: novaSenha
  })

  if (error) {
    return { error: 'Erro ao atualizar senha: ' + error.message }
  }

  return { success: 'Senha alterada com sucesso!' }
}