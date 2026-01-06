import { createServerSideClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default async function ArtigoPage({ params }: { params: { slug: string } }) {
  const supabase = await createServerSideClient();

  // Busca o artigo e QUEM escreveu (fazendo join com profiles)
  const { data: artigo } = await supabase
    .from('artigos')
    .select('*, profiles(full_name)')
    .eq('slug', params.slug)
    .single();

  if (!artigo) return notFound();

  return (
    <article className="prose prose-slate lg:prose-lg max-w-none">
      {/* Cabeçalho do Artigo */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <Badge variant="outline" className="mb-2 uppercase tracking-widest text-xs">
            {artigo.categoria === 'orixa' ? 'Orixá' : 'Entidade de Luz'}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{artigo.titulo}</h1>
        
        {artigo.imagem_url && (
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-6 shadow-lg">
                <Image src={artigo.imagem_url} alt={artigo.titulo} fill className="object-cover" />
            </div>
        )}
      </div>

      {/* O TEXTO (Usando white-space-pre-wrap para respeitar parágrafos do banco) */}
      <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-serif">
        {artigo.conteudo}
      </div>

      {/* Rodapé Singelo com Autor */}
      <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Publicado em {new Date(artigo.created_at).toLocaleDateString('pt-BR')}</span>
        <span className="italic">
            Escrito por: <strong className="font-semibold text-slate-600">{artigo.profiles?.full_name || 'Administração'}</strong>
        </span>
      </div>
    </article>
  );
}