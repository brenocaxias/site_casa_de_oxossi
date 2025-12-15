import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { supabase } from '@/lib/supabase';

// Inicializa o cliente
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: Request) {
  try {
    // LOG DE DEBUG: Para sabermos se o código novo rodou
    console.log("--- INICIANDO CHECKOUT (CÓDIGO NOVO) ---");

    const body = await request.json();
    const { title, price, customer_name, customer_whatsapp } = body;

    // 1. Cria Agendamento no Banco
    const { data: appointment, error: dbError } = await supabase
      .from('appointments')
      .insert([
        {
          customer_name,
          customer_whatsapp,
          service_type: title,
          amount: price,
          status: 'pending',
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Erro no Supabase:', dbError);
      return NextResponse.json({ error: 'Erro no banco' }, { status: 500 });
    }

    console.log("Agendamento criado ID:", appointment.id);

    // 2. Cria Preferência no Mercado Pago
    const preference = new Preference(client);

    // Estrutura EXATA exigida pelo Mercado Pago
    const preferenceData = {
      body: {
        items: [
          {
            id: appointment.id,
            title: title,
            quantity: 1,
            unit_price: Number(price),
            currency_id: 'BRL',
          },
        ],
        external_reference: appointment.id,
        // É aqui que estava o erro. Note que back_urls é irmão de items, não filho.
        back_urls: {
          success: 'http://localhost:3001/sucesso',
          failure: 'http://localhost:3001/',
          pending: 'http://localhost:3001/',
        },
        auto_return: 'approved',
      }
    };

    console.log("Enviando para Mercado Pago com back_urls...");
    const result = await preference.create(preferenceData);
    
    console.log("Sucesso! Link gerado:", result.init_point);

    return NextResponse.json({ url: result.init_point });

  } catch (error: any) {
    console.error('--- ERRO FATAL ---');
    console.error(error);
    return NextResponse.json({ 
        error: 'Erro na criação do pagamento',
        detail: error.message 
    }, { status: 500 });
  }
}