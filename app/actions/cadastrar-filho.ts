'use server';

import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const schemaCadastro = z.object({
  email: z.string().email("E-mail inválido."),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  telefone: z.string().nullable().optional(),
});

export async function cadastrarFilho(formData: FormData) {
  const rawData = {
    email: formData.get('email'),
    senha: formData.get('senha'),
    nome: formData.get('nome'),
    telefone: formData.get('telefone') || null,
  };

  const validacao = schemaCadastro.safeParse(rawData);

  if (!validacao.success) {
    return { 
      error: validacao.error.issues[0].message 
    };
  }

  const { email, senha, nome, telefone } = validacao.data;

  // Cliente Admin usando Service Role Key
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
    // 1. Criar usuário no Authentication
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
    
    if (!authData.user) throw new Error("Erro ao criar usuário.");

    // 2. Criar perfil na tabela 'profiles' (conforme usado no Dashboard)
    const { error: dbError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authData.user.id,
        full_name: nome, // Usando full_name para bater com o Dashboard
        email: email,
        role: 'filho',   // Define como filho por padrão
        // Se houver coluna telefone/data_cadastro no seu banco, adicione abaixo:
        // telefone: telefone,
      });

    if (dbError) {
      console.error("Erro no banco:", dbError);
      return { error: `Usuário criado, mas erro ao salvar na tabela 'profiles': ${dbError.message}` };
    }

    revalidatePath('/dashboard');
    return { success: true };

  } catch (error: any) {
    console.error("Erro no cadastro:", error);
    return { error: error.message || "Erro interno ao cadastrar." };
  }
}