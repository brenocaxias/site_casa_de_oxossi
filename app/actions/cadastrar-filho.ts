'use server';

import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Validação apenas para os 3 campos do formulário
const schemaCadastro = z.object({
  email: z.string().email("E-mail inválido."),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  telefone: z.string().nullable().optional(),
});

export async function cadastrarFilho(formData: FormData) {
  // Prepara os dados para validação (telefone vai como null pois não está no form)
  const rawData = {
    email: formData.get('email'),
    senha: formData.get('senha'),
    nome: formData.get('nome'),
    telefone: null,
  };

  const validacao = schemaCadastro.safeParse(rawData);

  if (!validacao.success) {
    return { error: validacao.error.issues[0].message };
  }

  const { email, senha, nome, telefone } = validacao.data;

  // Criar cliente Admin com a Service Role Key para ignorar restrições de Auth/RLS
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
    // 1. Criar utilizador no Auth do Supabase
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: senha,
      email_confirm: true,
      user_metadata: { full_name: nome }
    });

    if (authError) {
      if (authError.message.includes("already been registered")) {
        return { error: "Este e-mail já está registado na casa." };
      }
      throw authError;
    }

    if (!authData.user) throw new Error("Falha ao gerar utilizador.");

    // 2. Criar o perfil na tabela 'filhos'
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
      console.error("Erro na base de dados:", dbError);
      return { error: "Acesso criado, mas houve um erro ao guardar o perfil na tabela." };
    }

    revalidatePath('/dashboard');
    return { success: true };

  } catch (error: any) {
    console.error("Erro crítico no cadastro:", error);
    return { error: error.message || "Erro interno ao processar cadastro." };
  }
}