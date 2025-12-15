import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookOpen, ChevronRight, Search, Sparkles, Sprout, Shield } from "lucide-react";

export default function DoutrinaPage() {
  
  // --- BASE DE DADOS MOCKADA ---
  
  const orixas = [
    { nome: "Exu", titulo: "O Mensageiro", cor: "bg-red-950 text-red-200", desc: "Orixá da comunicação, do movimento e da abertura de caminhos." },
    { nome: "Ogum", titulo: "O Guerreiro", cor: "bg-blue-900 text-blue-100", desc: "Senhor do ferro, da tecnologia e da abertura de estradas." },
    { nome: "Oxóssi", titulo: "O Caçador", cor: "bg-green-600 text-white", desc: "Rei de Ketu, provedor da fartura, da caça e do conhecimento." },
    { nome: "Ossain", titulo: "Senhor das Ervas", cor: "bg-green-400 text-green-900", desc: "Detentor do segredo de todas as folhas e da cura litúrgica." },
    { nome: "Obaluaiê", titulo: "Senhor da Terra", cor: "bg-stone-800 text-stone-100", desc: "Orixá da cura, da terra e da passagem entre os mundos." },
    { nome: "Oxumaré", titulo: "O Arco-Íris", cor: "bg-yellow-400 text-yellow-900", desc: "A cobra e o arco-íris. Senhor dos ciclos, da riqueza e do movimento." },
    { nome: "Nanã Buruquê", titulo: "A Ancestral", cor: "bg-purple-800 text-purple-100", desc: "A mais velha das Iabás. Senhora da lama primordial e da sabedoria." },
    { nome: "Xangô", titulo: "A Justiça", cor: "bg-red-700 text-white", desc: "Rei de Oyó. Senhor do trovão, do fogo e da justiça divina." },
    { nome: "Oyá / Iansã", titulo: "Os Ventos", cor: "bg-orange-600 text-white", desc: "Guerreira, senhora dos ventos, das tempestades e dos eguns." },
    { nome: "Oxum", titulo: "O Amor e o Ouro", cor: "bg-yellow-300 text-yellow-900", desc: "Rainha da água doce, dona do ouro, da beleza e da fertilidade." },
    { nome: "Obá", titulo: "A Guerreira", cor: "bg-rose-700 text-white", desc: "Guerreira destemida, representa a força física e a lealdade." },
    { nome: "Ewá", titulo: "A Vidência", cor: "bg-pink-600 text-white", desc: "Senhora da vidência, do horizonte e das transformações." },
    { nome: "Logun Edé", titulo: "O Príncipe", cor: "bg-cyan-500 text-white", desc: "Filho de Oxum e Oxóssi, carrega a beleza e a habilidade da caça." },
    { nome: "Iemanjá", titulo: "Mãe de Cabeças", cor: "bg-blue-300 text-blue-900", desc: "Rainha do mar, mãe de quase todos os Orixás e do equilíbrio emocional." },
    { nome: "Oxalá", titulo: "O Pai Maior", cor: "bg-slate-100 text-slate-900 border", desc: "Pai da criação, da paz, da brancura e da fé." },
    { nome: "Tempo (Iroko)", titulo: "A Eternidade", cor: "bg-stone-500 text-white", desc: "Orixá árvore, representa o tempo e a ancestralidade." },
  ];

  const umbanda = [
    { nome: "Pretos Velhos", titulo: "Sabedoria", cor: "bg-slate-800 text-white", desc: "A humildade e a sabedoria ancestral da cura e do conselho." },
    { nome: "Caboclos", titulo: "A Força da Mata", cor: "bg-green-600 text-white", desc: "Entidades de luz que trazem a energia da mata e o passe energético." },
    { nome: "Erês", titulo: "Alegria e Pureza", cor: "bg-pink-300 text-pink-900", desc: "A renovação das energias através da alegria das crianças." },
    { nome: "Esquerda", titulo: "Guardiões", cor: "bg-red-900 text-white", desc: "Exus e Pombagiras. A proteção, o caminho e a lei." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-sm text-primary hover:opacity-80 transition">
            ← Voltar
          </Link>
          <div className="font-semibold text-slate-800 hidden md:block">Biblioteca de Doutrina</div>
          <div className="w-8"></div> {/* Espaçador */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        
        {/* Intro */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b pb-8">
          <div className="space-y-4 max-w-3xl">
            <Badge variant="outline" className="border-primary text-primary px-3 py-1">
              Acervo Digital
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Nossa Raiz e Fundamentos
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              O Ilè Asé Ègbé L'ajò Odé Igbò respira em dois pulmões: a tradição ancestral do 
              <strong className="text-primary"> Candomblé</strong> e a caridade da 
              <strong className="text-secondary-gold text-yellow-600"> Umbanda</strong>. 
              Aqui você estuda a essência de nossas divindades.
            </p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input placeholder="Buscar Orixá ou Guia..." className="pl-10 bg-white h-11 shadow-sm" />
          </div>
        </div>

        {/* ÁREA DE CONTEÚDO COM ABAS */}
        <Tabs defaultValue="orixas" className="w-full">
          
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3 h-12 bg-slate-200/50 p-1">
              <TabsTrigger value="orixas" className="text-base data-[state=active]:bg-white data-[state=active]:shadow-sm">Orixás</TabsTrigger>
              <TabsTrigger value="umbanda" className="text-base data-[state=active]:bg-white data-[state=active]:shadow-sm">Umbanda</TabsTrigger>
              <TabsTrigger value="rituais" className="text-base data-[state=active]:bg-white data-[state=active]:shadow-sm">Fundamentos</TabsTrigger>
            </TabsList>
          </div>

          {/* ABA 1: ORIXÁS DO CANDOMBLÉ */}
          {/* ABA 1: ORIXÁS DO CANDOMBLÉ (Atualizado: Card Inteiro Clicável) */}
          <TabsContent value="orixas" className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2 mb-4 text-slate-500">
                <Sparkles size={18} />
                <span className="text-sm font-medium uppercase tracking-wider">Panteão Africano</span>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {orixas.map((orixa, index) => {
                // Lógica de limpar o nome para virar Link (Ex: "Nanã Buruquê" -> "nana-buruque")
                const slug = orixa.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().replace(/\s+/g, '-');
                
                return (
                  <Link key={index} href={`/doutrina/${slug}`} className="block h-full">
                    <Card className="group h-full cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-slate-200 overflow-hidden bg-white flex flex-col">
                      
                      {/* Faixa de Cor do Orixá */}
                      <div className={`h-3 w-full ${orixa.cor}`} />
                      
                      <CardHeader className="pb-3 pt-6">
                        <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                            {orixa.nome}
                          </h3>
                          {/* Bolinha indicadora de cor */}
                          <div className={`h-4 w-4 rounded-full ${orixa.cor.split(' ')[0]} ring-2 ring-offset-2 ring-slate-100`} />
                        </div>
                        <CardDescription className="text-sm font-medium uppercase tracking-wide text-slate-500">
                          {orixa.titulo}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="flex-1">
                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                          {orixa.desc}
                        </p>
                      </CardContent>

                      <CardFooter className="pt-4 border-t border-slate-50 mt-auto bg-slate-50/50 group-hover:bg-primary/5 transition-colors">
                        <div className="flex items-center text-primary font-semibold text-sm group-hover:underline w-full justify-between">
                          Ler lenda completa 
                          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </TabsContent>

          {/* ABA 2: LINHAS DE UMBANDA */}
          {/* ABA 2: LINHAS DE UMBANDA (Atualizado com Links) */}
          <TabsContent value="umbanda" className="animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2 mb-6 text-slate-500">
                <Sprout size={18} />
                <span className="text-sm font-medium uppercase tracking-wider">Falanges de Trabalho</span>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
               {umbanda.map((linha, index) => {
                 // Gera o link amigável (ex: "Pretos Velhos" -> "pretos-velhos")
                 const slug = linha.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().replace(/\s+/g, '-');
                 
                 return (
                  <Link key={index} href={`/doutrina/${slug}`} className="block h-full">
                    <Card className="group h-full cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-l-secondary-gold bg-white flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">{linha.nome}</CardTitle>
                        <Badge variant="secondary" className="w-fit mt-2 bg-slate-100 text-slate-600 group-hover:bg-secondary-gold group-hover:text-white transition-colors">
                            {linha.titulo}
                        </Badge>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-slate-600 text-sm leading-relaxed">{linha.desc}</p>
                      </CardContent>
                      <CardFooter className="mt-auto">
                        <div className="flex items-center text-secondary-gold font-semibold text-sm w-full justify-between">
                           Ler fundamentos
                           <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                 );
               })}
            </div>
          </TabsContent>

          {/* ABA 3: RITUAIS / FUNDAMENTOS */}
          <TabsContent value="rituais" className="animate-in fade-in zoom-in-95 duration-300">
             <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-slate-100 rounded-xl p-8 flex flex-col justify-center items-center text-center border border-slate-200">
                   <Shield className="h-12 w-12 text-slate-400 mb-4" />
                   <h3 className="text-xl font-bold mb-2">Banhos e Limpezas</h3>
                   <p className="text-slate-600 mb-6">Aprenda a preparar banhos de ervas fundamentais para o equilíbrio energético.</p>
                   <Button>Acessar Guia de Ervas</Button>
                </div>
                <div className="bg-slate-100 rounded-xl p-8 flex flex-col justify-center items-center text-center border border-slate-200">
                   <BookOpen className="h-12 w-12 text-slate-400 mb-4" />
                   <h3 className="text-xl font-bold mb-2">Calendário Litúrgico</h3>
                   <p className="text-slate-600 mb-6">Confira as datas das festas, obrigações e rituais abertos ao público.</p>
                   <Button variant="outline">Ver Calendário 2025</Button>
                </div>
             </div>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}