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
    return { error: validacao.error.issues[0].message };
  }

  const { email, senha, nome, telefone } = validacao.data;

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
    // 1. Tentar criar o usuário no Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: senha,
      email_confirm: true,
      user_metadata: { full_name: nome }
    });

    let userId: string | undefined;

    if (authError) {
      if (authError.message.includes("already been registered")) {
        const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = listData.users.find(u => u.email === email);
        if (!existingUser) return { error: "Usuário já existe, mas erro ao recuperar ID." };
        userId = existingUser.id;
      } else {
        throw authError;
      }
    } else {
      userId = authData.user?.id;
    }
    
    if (!userId) throw new Error("ID do usuário não encontrado.");

    // 2. Usar UPSERT apenas com colunas confirmadas (id, full_name, email, role)
    const { error: dbError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        full_name: nome,
        email: email,
        role: 'filho'
      }, { onConflict: 'id' });

    if (dbError) {
      console.error("Erro no banco:", dbError);
      return { error: `Erro ao salvar perfil: ${dbError.message}` };
    }

    revalidatePath('/dashboard');
    return { success: true };

  } catch (error: any) {
    console.error("Erro no cadastro:", error);
    return { error: error.message || "Erro interno ao cadastrar." };
  }
}