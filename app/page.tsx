import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// ADICIONEI O 'Instagram' NA LISTA DE ÍCONES
import { Shell, Star, BookOpen, ArrowRight, MapPin, ShieldCheck, User, Flame, Instagram } from "lucide-react";
import { AgendamentoPublico } from "@/components/agendamento-publico";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* --- CABEÇALHO --- */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center">
                    <Image 
                        src="/logo-footer.png" 
                        alt="Logo Casa de Oxóssi" 
                        fill 
                        className="object-cover"
                        style={{ objectFit: 'contain', padding: '4px' }}
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-lg md:text-xl text-slate-800 leading-tight">Ilè Asé Ègbé L'ajò Odé Igbò</span>
                    <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">Piedade - RJ</span>
                </div>
            </div>

            <Link href="/login">
                <Button variant="outline" className="border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white transition-colors font-semibold gap-2">
                    <User size={18} />
                    <span className="hidden md:inline">Área do Filho</span>
                    <span className="md:hidden">Entrar</span>
                </Button>
            </Link>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative bg-slate-900 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] bg-[url('/pattern.png')] bg-repeat mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <Badge variant="outline" className="text-yellow-400 border-yellow-400/30 bg-yellow-400/10 mb-6 px-4 py-1 text-sm uppercase tracking-widest">
            Tradição • Fé • Ancestralidade
          </Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-white">
            Ilè Asé Ègbé L'ajò Odé Igbò
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Seja bem-vindo ao nosso espaço sagrado. <br/>
            Onde a ancestralidade nos guia e a fé nos fortalece.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             
             {/* Botão Genérico (Usuário Escolhe) */}
             <AgendamentoPublico 
                textoBotao="Agendar Consulta" 
                className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold h-12 px-8 shadow-xl border-none text-base"
             />
            
            <Link href="/doutrina">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/50 text-white hover:bg-white/10 h-12 px-8">
                <BookOpen className="mr-2 h-5 w-5" />
                Conhecer a Casa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- CARDS --- */}
      <section className="py-24 bg-white" id="atendimentos">
        <div className="container mx-auto px-4">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nossos Atendimentos</h2>
            <p className="text-slate-600">
              Orientação espiritual com seriedade. Selecione abaixo o tipo de consulta que você precisa.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            
            {/* Card 1: Jogo de Búzios */}
            <Card className="border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-yellow-400 transition-colors">
                   <Shell className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl text-slate-800">Jogo de Búzios</CardTitle>
                <CardDescription>Consulta Completa (1h)</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-slate-600 leading-relaxed text-sm">
                  Leitura profunda dos caminhos através do oráculo sagrado (Ifá). 
                  Orientação sobre saúde, prosperidade e espiritualidade.
                </p>
              </CardContent>
              <CardFooter className="pt-4 border-t border-slate-100 flex justify-end items-center bg-slate-50/50">
                <AgendamentoPublico 
                    textoBotao="Agendar" 
                    jogoPreSelecionado="buzios_completo"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-medium h-9 px-4 text-sm"
                />
              </CardFooter>
            </Card>

            {/* Card 2: INSTAGRAM DA CASA (NOVO CARROSSEL) */}
            <Card className="border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group overflow-hidden">
              {/* Header estilo Instagram */}
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-0 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Instagram className="h-6 w-6" />
                        <div className="flex flex-col">
                            <CardTitle className="text-base font-bold leading-none">Ilè Asé Ègbé L'ajò Odé Igbò</CardTitle>
                            <CardDescription className="text-purple-100 text-xs mt-1 leading-none">@egbelajo_odeigbo</CardDescription>
                        </div>
                    </div>
                    
                    {/* AQUI: Adicionei o Link no botão Seguir */}
                    <Link href="https://www.instagram.com/egbelajo_odeigbo/" target="_blank">
                        <Button size="sm" variant="secondary" className="h-7 text-xs bg-white text-purple-600 hover:bg-white/90 font-bold">
                            Seguir
                        </Button>
                    </Link>
                </div>
              </CardHeader>
              
              {/* Área das Fotos (Carrossel Manual) */}
              <CardContent className="p-0 relative h-64 bg-slate-100">
                  {/* Container com Scroll Horizontal */}
                  <div className="flex overflow-x-auto snap-x snap-mandatory h-full scrollbar-hide">
                        
                        {/* FOTO 1 */}
                        <div className="min-w-full h-full relative snap-center">
                            <Image src="/insta1.png" alt="Foto da Casa 1" fill className="object-cover" />
                        </div>
                        
                        {/* FOTO 2 */}
                        <div className="min-w-full h-full relative snap-center">
                             <Image src="/insta2.png" alt="Foto da Casa 2" fill className="object-cover" />
                        </div>

                        {/* FOTO 3 */}
                        <div className="min-w-full h-full relative snap-center">
                             <Image src="/insta4.png" alt="Foto da Casa 3" fill className="object-cover" />
                        </div>
                  </div>

                  {/* Dica visual de rolagem */}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none font-medium">
                     Deslize para ver ⮕
                  </div>
              </CardContent>

              <CardFooter className="pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                <span className="text-xs text-slate-500 italic">Acompanhe nosso dia a dia</span>
                <Link href="https://www.instagram.com/egbelajo_odeigbo/" target="_blank">
                    <Button variant="outline" size="sm" className="gap-2 text-purple-700 border-purple-200 hover:bg-purple-50 hover:text-purple-900">
                        Ver no Instagram <ArrowRight size={14} />
                    </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Card 3: Biblioteca */}
            <Card className="border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-yellow-400 transition-colors">
                   <BookOpen className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl text-slate-800">Biblioteca da Casa</CardTitle>
                <CardDescription>Material de Estudo</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-slate-600 leading-relaxed text-sm">
                  Acesse nosso acervo sobre Orixás, Falanges e fundamentos. 
                  O conhecimento é a chave para o fortalecimento da fé.
                </p>
              </CardContent>
              <CardFooter className="pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                <span className="font-bold text-lg text-slate-700">Gratuito</span>
                <Link href="/doutrina">
                    <Button size="sm" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100 font-medium gap-1">
                        Ler Agora <ArrowRight size={14} />
                    </Button>
                </Link>
              </CardFooter>
            </Card>

          </div>
        </div>
      </section>

      {/* --- RODAPÉ --- */}
      <footer className="bg-white text-slate-600 py-12 mt-auto border-t border-slate-200">
        <div className="container mx-auto px-4 text-center">
            <div className="mb-6 flex justify-center">
                <div className="relative h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200 overflow-hidden shadow-sm">
                   <Image 
                      src="/logo-footer.png" 
                      alt="Logo Rodapé" 
                      fill 
                      className="object-cover"
                      style={{ objectFit: 'contain', padding: '10px' }} 
                   />
                </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ilè Asé Ègbé L'ajò Odé Igbò</h3>
            
            <p className="mb-6 text-sm opacity-80 max-w-md mx-auto">
                Casa de Culto aos Orixás.
            </p>
            
            <div className="border-t border-slate-100 pt-8 text-xs text-slate-400">
                © {new Date().getFullYear()} Ilè Asé Ègbé L'ajò Odé Igbò. Todos os direitos reservados.
            </div>
        </div>
      </footer>
    </div>
  );
}