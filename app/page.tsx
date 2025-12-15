import Image from "next/image"; // Importar componente de imagem
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AgendamentoPublico } from "@/components/agendamento-publico";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Shell, Star, BookOpen } from "lucide-react"; // Ícones atualizados

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo e Nome */}
          <div className="flex items-center gap-3">
            <Image 
              src="/logo-header.png" 
              alt="Logo Casa de Oxóssi" 
              width={50} 
              height={50} 
              className="h-12 w-auto"
            />
            <span className="font-bold text-xl hidden md:block text-primary">
              Casa de Oxóssi Groaíras
            </span>
          </div>
          
          <nav className="flex items-center gap-6 text-sm font-medium">
            <a href="#sobre" className="hover:text-primary transition-colors">A Casa</a>
            <a href="/doutrina" className="hover:text-primary transition-colors">Doutrina</a>
            <Link href="/dashboard">
              <Button size="sm" className="z-50 bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 shadow-md">
                Área do Filho
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* --- HERO SECTION --- */}
        <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
          
          {/* Marca d'água do brasão no fundo (Centralizada) */}
          <div className="absolute inset-0 flex justify-center items-center opacity-[0.05] pointer-events-none z-0">
             <Image 
                src="/logo-footer.png" 
                width={700} 
                height={700} 
                alt="Brasão de fundo" 
                className="animate-in fade-in zoom-in duration-1000"
             />
          </div>

          <div className="container flex flex-col items-center gap-8 relative z-10 max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-slate-900 leading-[1.1]">
              Caminhos abertos pelo <br/>
              <span className="text-primary drop-shadow-sm">Axé de Oxóssi</span>
            </h1>
            
            <p className="max-w-[700px] text-lg sm:text-xl text-slate-600 font-medium">
              Seja bem-vindo ao Ilè Asé Ègbé L'ajò Odé Igbò. <br className="hidden md:block"/>
              Um espaço sagrado de fé, acolhimento e conexão com os Orixás.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
              <AgendamentoPublico textoBotao="Agendar Jogo de Búzios" />
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-2 border-primary text-primary hover:bg-primary/5">
                Conhecer a Doutrina
              </Button>
            </div>
          </div>
          
          {/* Seta indicando que tem mais conteúdo embaixo */}
          <div className="absolute bottom-8 animate-bounce text-slate-400">
            <span className="text-sm">Role para ver mais</span>
          </div>
        </section>

        {/* --- SERVIÇOS --- */}
        <section id="servicos" className="py-20 bg-slate-50 container">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold tracking-tight text-primary">Nossos Atendimentos</h2>
             <p className="text-slate-600 mt-2">Orientação espiritual com seriedade e respeito.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1: Jogo Completo */}
            <Card className="border-t-4 border-t-primary shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                   <Shell className="text-primary h-8 w-8" /> Jogo de Búzios
                </CardTitle>
                <CardDescription className="text-base">Consulta completa (Aprox. 1 hora)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Uma leitura profunda dos seus caminhos através do oráculo sagrado. 
                  Orientação sobre saúde, amor, prosperidade e o espiritual.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <span className="font-bold text-3xl text-primary">R$ 150,00</span>
                {/* --- AQUI ESTÁ A CORREÇÃO: flex justify-center --- */}
                <div className="w-full flex justify-center">
                  <AgendamentoPublico textoBotao="Agendar Agora" />
                </div>
              </CardFooter>
            </Card>

            {/* Card 2: Perguntas */}
            <Card className="border-t-4 border-t-secondary shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Star className="text-secondary h-6 w-6" /> Perguntas Objetivas
                </CardTitle>
                <CardDescription>Consulta rápida (30 min)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Foco em questões específicas. Ideal para quem busca direcionamento 
                  pontual e respostas diretas dos guias.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 mt-auto">
                <span className="font-bold text-2xl text-secondary">R$ 80,00</span>
                {/* Botão secundário usa a cor Dourada */}
                <div className="w-full">
                   <AgendamentoPublico textoBotao="Agendar Agora" variant="secondary" />
                </div>
              </CardFooter>
            </Card>

            {/* Card 3: Doutrina */}
            <Card className="bg-primary/5 border-primary/20 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-primary">
                  <BookOpen className="h-6 w-6" /> Estudo da Doutrina
                </CardTitle>
                <CardDescription>Conhecimento Gratuito</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-primary/80 font-medium">
                  Acesse nossa biblioteca sobre as Falanges, Orixás e fundamentos 
                  da nossa casa. O conhecimento liberta.
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                  Ler Artigos
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t bg-white">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brasão no Footer */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image 
                src="/logo-footer.png" 
                alt="Brasão Ilè Asé" 
                width={120} 
                height={120}
                className="h-auto w-32 opacity-90"
            />
            <p className="text-sm text-slate-500 text-center md:text-left max-w-xs">
                Ilè Asé Ègbé L'ajò Odé Igbò <br/>
                Desde 2009 levando fé e caridade.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-slate-500">
            <span className="flex items-center gap-2 font-medium text-primary">
                <MapPin size={18}/> Groaíras, CE
            </span>
            <p>© 2025 Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}