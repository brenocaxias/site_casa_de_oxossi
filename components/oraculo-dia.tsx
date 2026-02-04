import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Sparkles, Calendar, Quote } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

// Criamos um cliente simples apenas para leitura (já que os Odus são públicos)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function OraculoDia() {
  // Busca o último Odu publicado
  // .single() tenta pegar um só, se não tiver, ele retorna erro/null
  const { data: odu } = await supabase
    .from('odus')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle(); // maybeSingle evita erro no console se a tabela estiver vazia

  // MENSAGEM DE ESPERA (Se não tiver nenhum Odu no banco)
  if (!odu) {
    return (
        <Card className="w-full max-w-md mx-auto border-none shadow-xl bg-gradient-to-br from-[hsl(197,75%,35%)] to-slate-900 text-white relative overflow-hidden">
             {/* Efeito de fundo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full pointer-events-none" />
            
            <CardHeader className="text-center relative z-10 py-10">
                <div className="mx-auto bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-secondary opacity-50" />
                </div>
                <CardTitle className="text-secondary text-xl">Aguardando Mensagem</CardTitle>
                <CardDescription className="text-sky-100 max-w-xs mx-auto mt-2">
                    O Bàbá Edson publicará a orientação da semana em breve.
                </CardDescription>
            </CardHeader>
        </Card>
    );
  }

  // MENSAGEM DO ODU (Se tiver dados)
  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-xl bg-gradient-to-br from-[hsl(197,75%,35%)] to-slate-900 text-white relative overflow-hidden flex flex-col h-full transform transition-all hover:scale-[1.01]">
      
      {/* Detalhe de fundo vibrante */}
      <div className="absolute top-[-20%] right-[-20%] w-60 h-60 bg-secondary/10 blur-[80px] rounded-full pointer-events-none" />
      
      <CardHeader className="text-center relative z-10 pb-2 pt-8">
        <div className="mx-auto bg-gradient-to-br from-secondary to-amber-600 w-14 h-14 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-amber-900/40">
            <Sparkles className="w-7 h-7 text-white animate-pulse" />
        </div>
        
        <Badge variant="outline" className="mb-3 border-secondary/40 text-secondary mx-auto bg-secondary/5 uppercase tracking-[0.2em] text-[10px] font-bold px-3 py-1">
            Energia da Semana
        </Badge>
        
        <CardTitle className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
            {odu.titulo || "Conselho do Ifá"}
        </CardTitle>
        
        <div className="flex items-center justify-center gap-1.5 text-xs text-sky-200 mt-2 font-medium opacity-80">
            <Calendar size={12} />
            <span>{new Date(odu.created_at).toLocaleDateString('pt-BR')}</span>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 text-center flex-1 flex flex-col justify-center py-6 px-8">
        <Quote className="w-8 h-8 text-secondary/30 mx-auto mb-3 rotate-180" />
        <p className="text-lg md:text-xl font-medium leading-relaxed text-sky-50 italic drop-shadow-sm">
            "{odu.conteudo}"
        </p>
      </CardContent>

      <CardFooter className="relative z-10 bg-black/20 py-4 justify-center border-t border-white/5">
        <p className="text-[11px] text-sky-300/80 uppercase tracking-wider font-semibold">
            Ilè Asé Ègbé L'ajò Odé Igbò
        </p>
      </CardFooter>
    </Card>
  );
}