import { createServerSideClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArtigoPage(props: PageProps) {
  // 1. Log para ver se o Slug está chegando
  const params = await props.params;
  const { slug } = params;
  console.log("--- TENTANDO ABRIR ARTIGO ---");
  console.log("Slug recebido:", slug);

  const supabase = await createServerSideClient();

  // 2. Busca o artigo
  const { data: artigo, error } = await supabase
    .from('artigos')
    .select('*, profiles(full_name)')
    .eq('slug', slug)
    .single();

  // 3. Log para ver o resultado do Banco
  if (error) {
    console.error("Erro no Supabase:", error);
  }
  
  if (!artigo) {
    console.error("Artigo não encontrado (retornou null)");
    // Se não achou, pode ser RLS ou Slug errado
    return notFound();
  }

  console.log("Artigo encontrado:", artigo.titulo);

  return (
    <article className="prose prose-slate lg:prose-lg max-w-none">
      {/* Botão voltar Mobile */}
      <div className="md:hidden mb-4">
        <Link href="/doutrina" className="text-sm text-slate-500 flex items-center gap-1">
            <ArrowLeft size={16} /> Voltar ao menu
        </Link>
      </div>

      <div className="mb-8 border-b border-slate-200 pb-6">
        <Badge variant="outline" className="mb-3 uppercase tracking-widest text-xs bg-slate-50">
            {artigo.categoria}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">{artigo.titulo}</h1>
        
        {artigo.imagem_url && (
            <div className="relative w-full h-64 md:h-[400px] rounded-xl overflow-hidden mb-6 shadow-md bg-slate-100">
                <Image 
                    src={artigo.imagem_url} 
                    alt={artigo.titulo} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                />
            </div>
        )}
      </div>

      <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg font-serif">
        {artigo.conteudo}
      </div>

      <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex flex-col">
            <span>Publicado em: {new Date(artigo.created_at).toLocaleDateString('pt-BR')}</span>
            <span className="mt-1">
                Fonte / Autor: <strong className="font-semibold text-slate-600">{artigo.profiles?.full_name || 'Acervo da Casa'}</strong>
            </span>
        </div>
      </div>
    </article>
  );
}