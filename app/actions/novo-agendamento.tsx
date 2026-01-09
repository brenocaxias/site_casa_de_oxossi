'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';

const schemaAgendamento = z.object({
  nome: z.string().min(3, "Nome é obrigatório."),
  telefone: z.string().min(8, "Telefone inválido."),
  data: z.string().refine((val) => !isNaN(Date.parse(val)), "Data inválida."),
  horario: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Horário inválido (HH:MM)."),
  // CORREÇÃO 1: Simplificamos o enum para evitar erro de overload. 
  // O Zod já dá mensagem de erro padrão se o valor não for um desses.
  tipo: z.enum(['buzios_completo', 'limpeza', 'outro']),
});

export async function novoAgendamento(formData: FormData) {
  // CORREÇÃO 2: Adicionamos 'await' no cookies() (Obrigatório no Next.js 15)
  const cookieStore = await cookies(); 
  
  const validacao = schemaAgendamento.safeParse({
    nome: formData.get('nome'),
    telefone: formData.get('telefone'),
    data: formData.get('data'),
    horario: formData.get('horario'),
    tipo: formData.get('tipo'),
  });

  if (!validacao.success) {
    // CORREÇÃO 3: Usando .issues aqui também
    return { error: validacao.error.issues[0].message };
  }

  const dados = validacao.data;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
      },
    }
  );

  try {
    const { error } = await supabase
      .from('agendamentos')
      .insert({
        nome_cliente: dados.nome,
        telefone: dados.telefone,
        data_agendamento: dados.data,
        horario: dados.horario,
        tipo_consulta: dados.tipo,
        status: 'pendente',
        created_at: new Date().toISOString()
      });

    if (error) throw new Error(error.message);

    return { success: "Agendamento solicitado com sucesso!" };

  } catch (error: any) {
    console.error("Erro agendamento:", error);
    return { error: "Erro ao realizar agendamento. Tente novamente." };
  }
}