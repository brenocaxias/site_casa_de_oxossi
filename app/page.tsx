import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shell, BookOpen, ArrowRight, Instagram, Github, Smartphone, MapPin } from "lucide-react";
import { AgendamentoPublico } from "@/components/agendamento-publico";
import { Navbar } from "@/components/layout/navbar";
import { OraculoDia } from "@/components/oraculo-dia";

export default function Home() {
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PlaceOfWorship',
    name: "Ilè Asé Ègbé L'ajò Odé Igbò",
    alternateName: "Casa de Oxóssi Piedade",
    image: 'https://www.egbelajo-odeigbo.com.br/logo-header.png',
    description: 'Casa de Candomblé e culto aos orixás em Piedade, Rio de Janeiro. Agende Jogo de Búzios e trabalhos espirituais.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Joaquim Martins, 523',
      addressLocality: 'Rio de Janeiro',
      addressRegion: 'RJ',
      postalCode: '20745-230',
      addressCountry: 'BR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -22.898314875664973,
      longitude: -43.314711809718226
    },
    url: 'https://www.egbelajo-odeigbo.com.br',
    telephone: '+5521969690953',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00'
      }
    ]
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative bg-gradient-to-b from-[hsl(197,75%,45%)] to-slate-900 py-20 md:py-32 overflow-hidden">
        
        <div className="absolute inset-0 opacity-[0.1] bg-[url('/pattern.png')] bg-repeat mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <Badge variant="outline" className="text-secondary border-secondary/50 bg-secondary/10 mb-6 px-4 py-1 text-sm uppercase tracking-widest font-bold">
            Tradição • Fé • Ancestralidade
          </Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-white drop-shadow-lg">
            Ilè Asé Ègbé L'ajò Odé Igbò
          </h1>
          <p className="text-lg md:text-xl text-sky-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Seja bem-vindo ao nosso espaço sagrado. <br/>
            Onde a ancestralidade nos guia e a fé nos fortalece.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <AgendamentoPublico 
                textoBotao="Agendar Consulta" 
                className="w-full sm:w-auto bg-secondary hover:bg-amber-400 text-secondary-foreground font-bold h-12 px-8 shadow-lg shadow-amber-900/20 border-none text-base transition-transform hover:scale-105"
             />
            
            <Link href="/historia">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 h-12 px-8 font-medium">
                <MapPin className="mr-2 h-5 w-5 text-secondary" />
                Conhecer a Casa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO DO ORÁCULO --- */}
      <section className="py-16 bg-white border-b border-border">
          <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                      <h2 className="text-3xl font-bold text-primary mb-4">Busca uma Orientação Rápida?</h2>
                      <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                          Às vezes, tudo o que precisamos é de uma palavra de conforto ou direção. 
                          Concentre-se no seu momento, respire fundo e analise como o 
                          <span className="font-bold text-secondary"> Odu pode ajudar você </span>.
                      </p>
                      <div className="hidden lg:block p-4 bg-sky-50 rounded-lg border border-sky-100 text-sky-900 text-sm italic">
                          "O oráculo não decide por você, mas ilumina o caminho para que você possa caminhar."
                      </div>
                  </div>
                  
                  <div className="flex justify-center w-full">
                      <OraculoDia />
                  </div>
              </div>
          </div>
      </section>

      {/* --- CARDS DE SERVIÇOS --- */}
      <section className="py-24 bg-muted/30" id="atendimentos">
        <div className="container mx-auto px-4">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nossos Atendimentos</h2>
            <p className="text-muted-foreground">
              Orientação espiritual com seriedade. Selecione abaixo o tipo de consulta que você precisa.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            
            {/* Card 1: Jogo de Búzios */}
            <Card className="border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-50 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                   <Shell className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">Jogo de Búzios</CardTitle>
                <CardDescription>Consulta Completa (1h)</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Leitura profunda dos caminhos através do oráculo sagrado (Ifá). 
                  Orientação sobre saúde, prosperidade e espiritualidade.
                </p>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border flex justify-end items-center bg-muted/20">
                <AgendamentoPublico 
                    textoBotao="Agendar" 
                    jogoPreSelecionado="buzios_completo"
                    className="bg-primary hover:bg-sky-600 text-white font-medium h-9 px-4 text-sm transition-colors"
                />
              </CardFooter>
            </Card>

            {/* Card 2: INSTAGRAM DA CASA (CORRIGIDO) */}
            <Card className="border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group overflow-hidden bg-white">
              {/* MUDANÇA: Gradiente Turquesa para Azul (combinando com o site) */}
              <CardHeader className="bg-gradient-to-r from-primary to-sky-600 text-white mb-0 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Instagram className="h-6 w-6" />
                        <div className="flex flex-col">
                            <CardTitle className="text-base font-bold leading-none">Ilè Asé Ègbé L'ajò Odé Igbò</CardTitle>
                            <CardDescription className="text-sky-100 text-xs mt-1 leading-none">@egbelajo_odeigbo</CardDescription>
                        </div>
                    </div>
                    
                    <Link href="https://www.instagram.com/egbelajo_odeigbo/" target="_blank">
                        <Button size="sm" variant="secondary" className="h-7 text-xs bg-white text-primary hover:bg-white/90 font-bold border-none">
                            Seguir
                        </Button>
                    </Link>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 relative h-64 bg-muted">
                  <div className="flex overflow-x-auto snap-x snap-mandatory h-full scrollbar-hide">
                        <div className="min-w-full h-full relative snap-center">
                            <Image src="/insta1.png" alt="Foto da Casa 1" fill className="object-cover" />
                        </div>
                        <div className="min-w-full h-full relative snap-center">
                             <Image src="/insta2.png" alt="Foto da Casa 2" fill className="object-cover" />
                        </div>
                        <div className="min-w-full h-full relative snap-center">
                             <Image src="/insta4.png" alt="Foto da Casa 3" fill className="object-cover" />
                        </div>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none font-medium">
                      Deslize para ver ⮕
                  </div>
              </CardContent>

              <CardFooter className="pt-4 border-t border-border flex justify-between items-center bg-muted/20">
                <span className="text-xs text-muted-foreground italic">Acompanhe nosso dia a dia</span>
                <Link href="https://www.instagram.com/egbelajo_odeigbo/" target="_blank">
                    {/* Botão outline com cor Primary */}
                    <Button variant="outline" size="sm" className="gap-2 text-primary border-primary/20 hover:bg-primary/10 hover:text-primary">
                        Ver no Instagram <ArrowRight size={14} />
                    </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Card 3: Biblioteca */}
            <Card className="border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-50 text-secondary rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                   <BookOpen className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-amber-600 transition-colors">Biblioteca da Casa</CardTitle>
                <CardDescription>Material de Estudo</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Acesse nosso acervo sobre Orixás, Falanges e fundamentos. 
                  O conhecimento é a chave para o fortalecimento da fé.
                </p>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border flex justify-between items-center bg-muted/20">
                <span className="font-bold text-lg text-primary">Gratuito</span>
                <Link href="/doutrina">
                    <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-primary/10 hover:text-primary font-medium gap-1">
                        Ler Agora <ArrowRight size={14} />
                    </Button>
                </Link>
              </CardFooter>
            </Card>

          </div>
        </div>
      </section>

      {/* --- RODAPÉ --- */}
      <footer className="bg-white text-muted-foreground py-12 mt-auto border-t border-border">
        <div className="container mx-auto px-4 text-center">
            <div className="mb-6 flex justify-center">
                <div className="relative h-20 w-20 bg-muted/30 rounded-full flex items-center justify-center border border-border overflow-hidden shadow-sm">
                   <Image 
                      src="/logo-footer.png" 
                      alt="Logo Rodapé" 
                      fill 
                      className="object-cover"
                      style={{ objectFit: 'contain', padding: '10px' }} 
                   />
                </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Ilè Asé Ègbé L'ajò Odé Igbò</h3>
            
            <p className="mb-6 text-sm opacity-80 max-w-md mx-auto">
                Casa de Culto aos Orixás.
            </p>
            
            <div className="border-t border-border pt-8 text-xs text-muted-foreground">
                © {new Date().getFullYear()} Ilè Asé Ègbé L'ajò Odé Igbò. Todos os direitos reservados.
            </div>

            <div className="mt-6 flex flex-col items-center gap-3">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                    Desenvolvido por <span className="text-foreground font-bold">Breno Caxias</span>
                </span>
                
                <div className="flex items-center gap-4">
                    <Link href="https://github.com/brenocaxias" target="_blank" title="GitHub do Desenvolvedor">
                        <Github size={18} className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-300" />
                    </Link>

                    <Link href="https://instagram.com/brenocaxias" target="_blank" title="Instagram do Desenvolvedor">
                        <Instagram size={18} className="text-muted-foreground hover:text-pink-600 hover:scale-110 transition-all duration-300" />
                    </Link>

                    <Link href="https://wa.me/5588994047841" target="_blank" title="Falar com Desenvolvedor">
                        <Smartphone size={18} className="text-muted-foreground hover:text-green-600 hover:scale-110 transition-all duration-300" />
                    </Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}