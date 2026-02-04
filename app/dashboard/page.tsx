import { redirect } from 'next/navigation';
import { createServerSideClient } from '@/lib/supabase-server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Folder, FileText, Image as ImageIcon, Calendar, Download, Smartphone, User, Music, ShieldAlert } from 'lucide-react';
import { SignOutButton } from '@/components/auth/sign-out-button';
import { NovoAgendamento } from '@/components/dashboard/novo-agendamento';
import { UploadArquivo } from '@/components/dashboard/upload-arquivo';
import { AcoesAgendamento } from '@/components/dashboard/acoes-agendamento';
import { CadastroFilho } from '@/components/dashboard/cadastro-filho';
import { BotaoAlterarSenha } from '@/components/dashboard/botao-alterar-senha';
import { NovoArtigo } from '@/components/dashboard/novo-artigo';
import { ListaArtigos } from '@/components/dashboard/lista-artigos';
import { AtualizarOdu } from '@/components/dashboard/atualizar-odu';

const formatDate = (dateString: string) => {
    if (!dateString) return 'Data a definir';
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
    });
};

export default async function DashboardPage() {
  const supabase = await createServerSideClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: perfil } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const isAdmin = perfil?.role === 'admin';

  // BUSCA TUDO AO MESMO TEMPO
  const [meusAgendamentosRes, arquivosRes, todosAgendamentosRes, todosArtigosRes] = await Promise.all([
    supabase.from('agendamentos').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    supabase.from('arquivos_casa').select('*').order('created_at', { ascending: false }),
    isAdmin ? supabase.from('agendamentos').select('*').order('created_at', { ascending: false }) : Promise.resolve({ data: [] }),
    isAdmin ? supabase.from('artigos').select('*').order('created_at', { ascending: false }) : Promise.resolve({ data: [] })
  ]);

  const meusAgendamentos = meusAgendamentosRes.data || [];
  const arquivosReais = arquivosRes.data || [];
  const todosAgendamentos = todosAgendamentosRes.data || [];
  const todosArtigos = todosArtigosRes.data || [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* HEADER COM GRADIENTE TURQUESA */}
      <header className="bg-gradient-to-r from-primary to-sky-600 border-b border-primary/20 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between text-white">
          <div className="font-bold text-xl flex items-center gap-2">
            <ShieldAlert className="text-secondary" /> Área Restrita
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-sky-100 hidden md:block">
              {perfil?.full_name || user.email} ({isAdmin ? 'Bàbá' : 'Filho'})
            </span>
            <div className="flex gap-2">
                <BotaoAlterarSenha />
                <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1 overflow-x-hidden">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Bem-vindo, <span className="text-primary">{perfil?.full_name || 'Filho de Fé'}</span>.
        </h1>
        <p className="text-slate-600 mb-8">Esta é a secretaria virtual da nossa casa.</p>

        <Tabs defaultValue={isAdmin ? "admin" : "arquivos"} className="w-full">
          
          <TabsList className="mb-6 w-full h-auto flex flex-wrap justify-center gap-2 bg-white p-2 border border-slate-200 rounded-xl shadow-sm">
            {isAdmin && (
                <TabsTrigger 
                    value="admin" 
                    className="min-w-[120px] data-[state=active]:bg-primary data-[state=active]:text-white font-bold"
                >
                    Painel do Bàbá
                </TabsTrigger>
            )}
            <TabsTrigger 
                value="arquivos" 
                className="min-w-[120px] data-[state=active]:bg-primary data-[state=active]:text-white"
            >
                📂 Arquivos da Casa
            </TabsTrigger>
            <TabsTrigger 
                value="agendamentos" 
                className="min-w-[120px] data-[state=active]:bg-primary data-[state=active]:text-white"
            >
                📅 Meus Agendamentos
            </TabsTrigger>
          </TabsList>

           {isAdmin && (
            <TabsContent value="admin" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              {/* --- BLOCO 1: ATENDIMENTOS --- */}
              <Card className="border-primary/20 bg-sky-50/50 shadow-md">
                  <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-primary/10 pb-6">
                      <div>
                        <CardTitle className="text-primary flex items-center gap-2 text-2xl">
                            <User className="h-6 w-6 text-secondary"/> Gestão da Casa
                        </CardTitle>
                        <CardDescription>Gerencie atendimentos, conteúdo e filhos da casa.</CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                          <CadastroFilho />
                          <NovoArtigo userId={user.id} />
                          <AtualizarOdu userId={user.id} />
                      </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {todosAgendamentos.length === 0 ? (
                        <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-dashed border-slate-300">
                             <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-2"/>
                             <p>Nenhum agendamento encontrado.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {todosAgendamentos.map((item: any) => (
                                <div key={item.id} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-4 items-start md:items-center group">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-lg text-slate-800 group-hover:text-primary transition-colors">
                                                {item.cliente_nome || "Filho da Casa"}
                                            </span>
                                            {item.cliente_contato && (
                                                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 gap-1 font-normal">
                                                    <Smartphone size={12}/> {item.cliente_contato}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500 flex items-center gap-2">
                                            {item.tipo_jogo === 'buzios_completo' ? 'Jogo de Búzios' : 'Consulta'} 
                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                            <span className="font-medium text-slate-700">{formatDate(item.data_agendamento)}</span>
                                        </p>
                                        {item.notas && <p className="text-xs text-slate-400 italic bg-slate-50 p-1 rounded inline-block">"{item.notas}"</p>}
                                    </div>
                                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                                        <Badge className={`
                                            ${item.status === 'pendente' ? 'bg-amber-100 text-amber-800 border-amber-200' : ''}
                                            ${item.status === 'confirmado' ? 'bg-teal-100 text-teal-800 border-teal-200' : ''}
                                            ${item.status === 'cancelado' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                                            uppercase tracking-wider font-bold text-[10px] px-2 py-1
                                        `}>
                                            {item.status}
                                        </Badge>
                                        <AcoesAgendamento id={item.id} status={item.status} telefone={item.cliente_contato} nome={item.cliente_nome} data={formatDate(item.data_agendamento)}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                  </CardContent>
              </Card>

              {/* --- BLOCO 2: HISTÓRICO DE ARTIGOS --- */}
              <ListaArtigos artigos={todosArtigos} />

            </TabsContent>
           )}

          <TabsContent value="arquivos" className="animate-in fade-in slide-in-from-bottom-2">
             <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Material de Estudo e Fotos</h3>
                    <p className="text-sm text-slate-500">Documentos compartilhados pela administração.</p>
                </div>
                {isAdmin && <UploadArquivo />}
             </div>
             {(!arquivosReais || arquivosReais.length === 0) ? (
                 <div className="text-center py-20 text-slate-400 bg-white border border-dashed border-slate-300 rounded-lg">
                    <Folder className="mx-auto h-12 w-12 mb-4 opacity-50 text-primary" />
                    <p>Ainda não há arquivos compartilhados.</p>
                 </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {arquivosReais.map((arquivo: any) => (
                    <a href={arquivo.url} target="_blank" rel="noopener noreferrer" key={arquivo.id} className="block group">
                        <Card className="hover:shadow-lg transition-all cursor-pointer border-slate-200 hover:border-primary h-full group-hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            {arquivo.tipo === 'img' && <ImageIcon className="text-primary" />}
                            {arquivo.tipo === 'doc' && <FileText className="text-amber-500" />}
                            {arquivo.tipo === 'audio' && <Music className="text-purple-500" />}
                            </CardTitle>
                            <Download size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold mt-2 truncate text-slate-800 group-hover:text-primary transition-colors">{arquivo.nome}</div>
                            <p className="text-xs text-muted-foreground mt-1 bg-slate-100 inline-block px-2 py-0.5 rounded">{arquivo.tamanho}</p>
                        </CardContent>
                        </Card>
                    </a>
                  ))}
                </div>
            )}
          </TabsContent>

          <TabsContent value="agendamentos" className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                <div>
                    <h3 className="font-bold text-lg text-slate-800">Seus Pedidos</h3>
                    <p className="text-sm text-slate-500">Acompanhe suas solicitações pessoais e consultas.</p>
                </div>
                <NovoAgendamento userId={user.id} />
            </div>
            {(!meusAgendamentos || meusAgendamentos.length === 0) ? (
                 <div className="text-center py-16 text-slate-500 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50">
                    <Calendar className="mx-auto h-12 w-12 mb-3 text-slate-300" />
                    <p>Você ainda não tem agendamentos registrados.</p>
                    <p className="text-xs mt-2 text-slate-400">Clique em "Novo Agendamento" para começar.</p>
                 </div>
            ) : (
                <div className="grid gap-4">
                    {meusAgendamentos.map((item: any) => (
                        <Card key={item.id} className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                    <div>
                                        <CardTitle className="text-lg text-primary">
                                            {item.tipo_jogo === 'buzios_completo' ? 'Jogo de Búzios' : 'Consulta'}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1">
                                            <Calendar size={14}/> Solicitado para: <span className="font-semibold text-slate-700">{formatDate(item.data_agendamento)}</span>
                                        </CardDescription>
                                    </div>
                                    <Badge className={`
                                        ${item.status === 'pendente' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : ''}
                                        ${item.status === 'confirmado' ? 'bg-teal-100 text-teal-800 hover:bg-teal-200' : ''}
                                        ${item.status === 'cancelado' ? 'bg-red-100 text-red-800 hover:bg-red-200' : ''}
                                        uppercase tracking-widest px-3 py-1
                                    `}>
                                        {item.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}