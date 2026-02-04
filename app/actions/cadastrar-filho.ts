'use server';

import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const schemaCadastro = z.object({
  email: z.string().email("E-mail inválido."),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  telefone: z.string().nullable().optional(), // ADICIONE O .nullable() AQUI
});

export async function cadastrarFilho(formData: FormData) {
  const rawData = {
    email: formData.get('email'),
    senha: formData.get('senha'),
    nome: formData.get('nome'),
    telefone: formData.get('telefone'),
  };

  const validacao = schemaCadastro.safeParse(rawData);

  if (!validacao.success) {
    // CORREÇÃO AQUI: Mudamos de .errors para .issues
    return { 
      error: validacao.error.issues[0].message 
    };
  }

  const { email, senha, nome, telefone } = validacao.data;

  // Cliente Admin (Service Role)
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
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: senha,
      email_confirm: true,
      user_metadata: { nome }
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error("Erro ao criar usuário.");

    const { error: dbError } = await supabaseAdmin
      .from('filhos')
      .insert({
        id: authData.user.id,
        nome,
        email,
        telefone,
        data_cadastro: new Date().toISOString(),
      });

    if (dbError) {
      console.error("Erro no banco:", dbError);
      throw new Error("Usuário criado, mas erro ao salvar perfil.");
    }

    return { success: "Filho de santo cadastrado com sucesso!" };

  } catch (error: any) {
    console.error("Erro no cadastro:", error);
    return { error: error.message || "Erro interno ao cadastrar." };
  }
}