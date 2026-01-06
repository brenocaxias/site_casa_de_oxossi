import { createServerSideClient } from '@/lib/supabase-server';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Feather, Star } from 'lucide-react';

export default async function DoutrinaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSideClient();
  
  // Busca apenas títulos e slugs para o menu (leve e rápido)
  const { data: artigos } = await supabase
    .from('artigos')
    .select('titulo, slug, categoria')
    .eq('publicado', true)
    .order('titulo');

  // Separa as categorias
  const orixas = artigos?.filter(a => a.categoria === 'orixa') || [];
  const entidades = artigos?.filter(a => a.categoria === 'entidade') || [];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {/* --- SIDEBAR LATERAL --- */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0">
        <div className="p-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <BookOpen className="text-yellow-600" size={20}/> Biblioteca
          </h2>
        </div>
        
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-6">
            
            {/* GRUPO ORIXÁS */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Star size={10} /> Orixás
              </h3>
              <nav className="flex flex-col space-y-1">
                {orixas.map((item) => (
                  <Link 
                    key={item.slug} 
                    href={`/doutrina/${item.slug}`}
                    className="text-sm text-slate-600 hover:text-yellow-600 hover:bg-yellow-50 px-2 py-1.5 rounded-md transition-colors block truncate"
                  >
                    {item.titulo}
                  </Link>
                ))}
              </nav>
            </div>

            {/* GRUPO ENTIDADES */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Feather size={10} /> Entidades / Guias
              </h3>
              <nav className="flex flex-col space-y-1">
                {entidades.map((item) => (
                  <Link 
                    key={item.slug} 
                    href={`/doutrina/${item.slug}`}
                    className="text-sm text-slate-600 hover:text-purple-600 hover:bg-purple-50 px-2 py-1.5 rounded-md transition-colors block truncate"
                  >
                    {item.titulo}
                  </Link>
                ))}
              </nav>
            </div>

          </div>
        </ScrollArea>
      </aside>

      {/* --- CONTEÚDO PRINCIPAL (Onde o texto aparece) --- */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-3xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}