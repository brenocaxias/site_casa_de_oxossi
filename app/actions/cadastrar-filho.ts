'use server';

import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Schema validando apenas os 3 campos que você utiliza
const schemaCadastro = z.object({
  email: z.string().email("E-mail inválido."),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  // Definido como opcional e aceitando null para não quebrar quando o form não envia
  telefone: z.string().nullable().optional(),
});

export async function cadastrarFilho(formData: FormData) {
  // Captura os dados do formulário
  const rawData = {
    email: formData.get('email'),
    senha: formData.get('senha'),
    nome: formData.get('nome'),
    telefone: null, // Forçamos null já que o campo não existe no formulário
  };

  const validacao = schemaCadastro.safeParse(rawData);

  if (!validacao.success) {
    return { error: validacao.error.issues[0].message };
  }

  const { email, senha, nome, telefone } = validacao.data;

  // Cria o cliente Admin usando a Service Role Key (necessária para criar usuários no Auth)
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, 
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false 
      }
    }
  );

  try {
    // 1. Criar usuário no sistema de Autenticação (Auth)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: senha,
      email_confirm: true,
      user_metadata: { full_name: nome }
    });

    if (authError) {
      if (authError.message.includes("already been registered")) {
        return { error: "Este e-mail já está cadastrado no sistema." };
      }
      throw authError;
    }

    if (!authData.user) throw new Error("Erro ao gerar o usuário.");

    // 2. Criar o registro na tabela 'filhos'
    const { error: dbError } = await supabaseAdmin
      .from('filhos')
      .insert({
        id: authData.user.id,
        nome,
        email,
        telefone,
        role: 'filho'
      });

    if (dbError) {
      console.error("Erro no banco:", dbError);
      return { error: "Usuário criado, mas houve um erro ao salvar o perfil na tabela." };
    }

    revalidatePath('/dashboard');
    return { success: true };

  } catch (error: any) {
    console.error("Erro no cadastro:", error);
    return { error: error.message || "Erro interno ao processar o cadastro." };
  }
}