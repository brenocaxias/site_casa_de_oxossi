import { redirect } from 'next/navigation';
import { createServerSideClient } from '@/lib/supabase-server';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Folder, FileText, Image as ImageIcon, Calendar, Download, Clock, CheckCircle, Smartphone, User, Music } from 'lucide-react';
import Link from 'next/link';
import { SignOutButton } from '@/components/auth/sign-out-button';
import { NovoAgendamento } from '@/components/dashboard/novo-agendamento';
import { UploadArquivo } from '@/components/dashboard/upload-arquivo';
import { AcoesAgendamento } from '@/components/dashboard/acoes-agendamento';
import { CadastroFilho } from '@/components/dashboard/cadastro-filho';
import { BotaoAlterarSenha } from '@/components/dashboard/botao-alterar-senha';

const formatDate = (dateString: string) => {
    if (!dateString) return 'Data a definir';
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
    });
};

export default async function DashboardPage() {
  const supabase = await createServerSideClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // 1. Busca perfil (Admin ou User)
  const { data: perfil } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const isAdmin = perfil?.role === 'admin';

  // 2. Busca Agendamentos (Lógica Admin vs User)
  let meusAgendamentos: any[] = [];
  let todosAgendamentos: any[] = [];

  // Seus agendamentos pessoais
  const { data: dataPessoal } = await supabase
    .from('agendamentos')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  meusAgendamentos = dataPessoal || [];

  // Se for admin, busca tudo para o painel
  if (isAdmin) {
     const { data: dataGeral } = await supabase
       .from('agendamentos')
       .select('*')
       .order('created_at', { ascending: false });
     todosAgendamentos = dataGeral || [];
  }

  // 3. Busca ARQUIVOS REAIS da Casa
  const { data: arquivosReais } = await supabase
    .from('arquivos_casa')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-primary flex items-center gap-2">
            🔒 Área Restrita
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 hidden md:block">
              {perfil?.full_name || user.email} ({isAdmin ? 'Pai de Santo' : 'Filho'})
            </span>
            
            <BotaoAlterarSenha />
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1 overflow-x-hidden">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Bem-vindo, {perfil?.full_name || 'Filho de Fé'}.</h1>
        <p className="text-slate-600 mb-8">Esta é a secretaria virtual da nossa casa.</p>

        <Tabs defaultValue={isAdmin ? "admin" : "arquivos"} className="w-full">
          
          <TabsList className="mb-6 w-full h-auto flex flex-wrap justify-center gap-2 bg-slate-100/80 p-2">
            {isAdmin && (
                <TabsTrigger value="admin" className="text-blue-600 font-bold min-w-[120px]">
                    Painel do Pai de Santo
                </TabsTrigger>
            )}
            <TabsTrigger value="arquivos" className="min-w-[120px]">
                📂 Arquivos da Casa
            </TabsTrigger>
            <TabsTrigger value="agendamentos" className="min-w-[120px]">
                📅 Meus Agendamentos
            </TabsTrigger>
          </TabsList>

           {/* --- ABA ADMIN --- */}
           {isAdmin && (
            <TabsContent value="admin">
              <Card className="border-blue-200 bg-blue-50/30">
                  <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-blue-800 flex items-center gap-2">
                            <User className="h-6 w-6"/> Gestão de Atendimentos
                        </CardTitle>
                        <CardDescription>Visualize pedidos e cadastre novos filhos.</CardDescription>
                      </div>
                      
                      <CadastroFilho />

                  </CardHeader>
                  <CardContent>
                    {todosAgendamentos.length === 0 ? (
                        <p className="text-center py-8 text-slate-500">Nenhum agendamento encontrado.</p>
                    ) : (
                        <div className="space-y-4">
                            {todosAgendamentos.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-lg border shadow-sm flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-lg text-slate-800">
                                                {item.cliente_nome || "Filho da Casa"}
                                            </span>
                                            {item.cliente_contato && (
                                                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 gap-1">
                                                    <Smartphone size={12}/> {item.cliente_contato}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500">
                                            {item.tipo_jogo === 'buzios_completo' ? 'Jogo de Búzios' : 'Consulta'} 
                                            • <span className="font-medium text-slate-700">{formatDate(item.data_agendamento)}</span>
                                        </p>
                                        {item.notas && (
                                            <p className="text-xs text-slate-400 italic">"{item.notas}"</p>
                                        )}
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <Badge className={
                                            item.status === 'pendente' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 
                                            item.status === 'confirmado' ? 'bg-green-100 text-green-800 border-green-200' :
                                            'bg-red-100 text-red-800 border-red-200'
                                        }>
                                            {item.status.toUpperCase()}
                                        </Badge>

                                        {/* CORREÇÃO AQUI: Passando o telefone, nome e data para o botão */}
                                        <AcoesAgendamento 
                                            id={item.id} 
                                            status={item.status} 
                                            telefone={item.cliente_contato}
                                            nome={item.cliente_nome}
                                            data={formatDate(item.data_agendamento)}
                                        />
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                  </CardContent>
              </Card>
            </TabsContent>
           )}

          {/* --- ABA ARQUIVOS --- */}
          <TabsContent value="arquivos">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-700">Material de Estudo e Fotos</h3>
                {isAdmin && <UploadArquivo />}
             </div>

            {(!arquivosReais || arquivosReais.length === 0) ? (
                 <div className="text-center py-20 text-slate-400 bg-white border rounded-lg">
                    <Folder className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Ainda não há arquivos compartilhados.</p>
                 </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {arquivosReais.map((arquivo) => (
                    <a href={arquivo.url} target="_blank" rel="noopener noreferrer" key={arquivo.id} className="block group">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 hover:border-primary/50 h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            {arquivo.tipo === 'img' && <ImageIcon className="text-blue-500" />}
                            {arquivo.tipo === 'doc' && <FileText className="text-red-500" />}
                            {arquivo.tipo === 'audio' && <Music className="text-purple-500" />}
                            </CardTitle>
                            <Download size={16} className="text-slate-300 group-hover:text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold mt-2 truncate text-slate-800">{arquivo.nome}</div>
                            <p className="text-xs text-muted-foreground mt-1">{arquivo.tamanho}</p>
                        </CardContent>
                        </Card>
                    </a>
                  ))}
                </div>
            )}
          </TabsContent>

          {/* --- ABA MEUS AGENDAMENTOS --- */}
          <TabsContent value="agendamentos" className="space-y-4">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
                <div>
                    <h3 className="font-bold text-lg">Seus Pedidos</h3>
                    <p className="text-sm text-slate-500">Acompanhe suas solicitações pessoais.</p>
                </div>
                <NovoAgendamento userId={user.id} />
            </div>

            {(!meusAgendamentos || meusAgendamentos.length === 0) ? (
                 <div className="text-center py-10 text-slate-500 border-2 border-dashed rounded-lg bg-slate-50/50">
                    <Calendar className="mx-auto h-10 w-10 mb-3 text-slate-300" />
                    <p>Você ainda não tem agendamentos registrados.</p>
                 </div>
            ) : (
                <div className="grid gap-4">
                    {meusAgendamentos.map((item) => (
                        <Card key={item.id} className="border-l-4 border-l-primary">
                            <CardHeader className="pb-2">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                                    <div>
                                        <CardTitle className="text-lg">
                                            {item.tipo_jogo === 'buzios_completo' ? 'Jogo de Búzios' : 'Consulta'}
                                        </CardTitle>
                                        <CardDescription>Solicitado para: {formatDate(item.data_agendamento)}</CardDescription>
                                    </div>
                                    <Badge className={
                                            item.status === 'pendente' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 
                                            item.status === 'confirmado' ? 'bg-green-100 text-green-800 border-green-200' :
                                            'bg-red-100 text-red-800 border-red-200'
                                        }>
                                        {item.status.toUpperCase()}
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