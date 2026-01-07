import { createServerSideClient } from '@/lib/supabase-server';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default async function DoutrinaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSideClient();
  
  // Busca os títulos do banco para montar o menu
  // Usamos "any" para evitar erros de tipagem no build por enquanto
  const { data: artigos }: { data: any } = await supabase
    .from('artigos')
    .select('titulo, slug, categoria')
    .eq('publicado', true)
    .order('titulo');

  const orixas = artigos?.filter((a: any) => a.categoria === 'orixa') || [];
  const entidades = artigos?.filter((a: any) => a.categoria === 'entidade') || [];
  const fundamentos = artigos?.filter((a: any) => a.categoria === 'fundamento') || [];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {/* --- SIDEBAR (Barra Lateral) --- */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 h-auto md:h-screen md:sticky md:top-0 overflow-y-auto">
        <div className="p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <Link href="/doutrina" className="font-bold text-lg text-slate-800 flex items-center gap-2 hover:text-primary transition-colors">
            <BookOpen className="text-yellow-600" size={20}/> Biblioteca
          </Link>
        </div>
        
        <div className="p-4 space-y-6">
          {/* Menu Orixás */}
          {orixas.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Orixás</h3>
              <nav className="flex flex-col space-y-1">
                {orixas.map((item: any) => (
                  <Link 
                    key={item.slug} 
                    href={`/doutrina/${item.slug}`}
                    className="text-sm text-slate-600 hover:text-yellow-600 hover:bg-yellow-50 px-2 py-1.5 rounded-md transition-colors truncate block"
                  >
                    {item.titulo}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* Menu Entidades */}
          {entidades.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Entidades / Guias</h3>
              <nav className="flex flex-col space-y-1">
                {entidades.map((item: any) => (
                  <Link 
                    key={item.slug} 
                    href={`/doutrina/${item.slug}`}
                    className="text-sm text-slate-600 hover:text-purple-600 hover:bg-purple-50 px-2 py-1.5 rounded-md transition-colors truncate block"
                  >
                    {item.titulo}
                  </Link>
                ))}
              </nav>
            </div>
          )}

           {/* Menu Fundamentos */}
           {fundamentos.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Fundamentos</h3>
              <nav className="flex flex-col space-y-1">
                {fundamentos.map((item: any) => (
                  <Link 
                    key={item.slug} 
                    href={`/doutrina/${item.slug}`}
                    className="text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded-md transition-colors truncate block"
                  >
                    {item.titulo}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </aside>

      {/* --- CONTEÚDO PRINCIPAL (Onde o texto aparece) --- */}
      <main className="flex-1 p-6 md:p-10 bg-white md:bg-transparent">
        <div className="max-w-3xl mx-auto bg-white md:p-8 md:rounded-xl md:shadow-sm min-h-[50vh]">
            {children}
        </div>
      </main>
    </div>
  );
}