import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Hammer, ArrowDown, Quote, Star, Users } from "lucide-react";

export default function HistoriaPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* --- HERO SECTION: Gradiente Turquesa Rico --- */}
      <section className="bg-gradient-to-b from-[hsl(197,75%,45%)] to-slate-900 text-white pt-16 pb-32 px-4 text-center relative overflow-hidden">
        {/* Padrão de Fundo */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          
          <Link href="/" className="mb-8 group" title="Voltar para o Início">
            <div className="bg-white/95 p-4 rounded-full shadow-[0_0_30px_rgba(56,180,227,0.4)] group-hover:scale-110 group-hover:bg-white transition-all duration-300 cursor-pointer">
                <Image 
                    src="/logo-footer.png" 
                    alt="Logo Casa de Oxóssi" 
                    width={80} 
                    height={80} 
                    className="w-16 h-16 object-contain"
                />
            </div>
          </Link>

          <Badge className="bg-secondary text-secondary-foreground px-4 py-1 text-sm uppercase tracking-widest font-bold hover:bg-amber-400 mb-6 border-none shadow-lg">
            Nossa Trajetória
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-md">
            Uma Jornada de Fé e Resiliência
          </h1>
          
          <p className="text-lg md:text-xl text-sky-100 leading-relaxed max-w-2xl font-light">
            Do pequeno altar doméstico ao grande templo de Orixás. Conheça os passos que nos trouxeram até aqui.
          </p>
          
          <div className="flex justify-center pt-8 animate-bounce opacity-70 text-secondary">
            <ArrowDown size={32} />
          </div>
        </div>
      </section>

      {/* --- TIMELINE --- */}
      <div className="container mx-auto px-4 -mt-20 relative z-20 max-w-4xl">
        
        {/* 2009: A Fundação */}
        <div className="flex flex-col md:flex-row gap-6 mb-16 group">
            <div className="md:w-1/4 flex flex-col items-center md:items-end text-center md:text-right pt-2">
                <span className="text-4xl font-black text-slate-300 group-hover:text-primary transition-colors">2009</span>
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">A Fundação</span>
                <div className="h-full w-0.5 bg-border mt-4 hidden md:block group-hover:bg-primary/50 transition-colors"></div>
            </div>

            <div className="md:w-3/4">
                <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden bg-white">
                    <div className="bg-primary h-2 w-full"></div>
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-sky-50 text-primary rounded-lg"><Users size={24}/></div>
                            <h2 className="text-2xl font-bold text-foreground">A Semente Plantada</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                            Em uma terça-feira sagrada, 20 de janeiro, o Preto Velho <strong>Pai José de Aruanda</strong> fundou espiritualmente nossa casa.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Tudo começou de forma simples, dentro de casa. Enfrentamos preconceitos, mas nunca deixamos de acolher quem buscava auxílio.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* 2014: Ganhando as Ruas */}
        <div className="flex flex-col md:flex-row gap-6 mb-16 group">
            <div className="md:w-1/4 flex flex-col items-center md:items-end text-center md:text-right pt-2">
                <span className="text-4xl font-black text-slate-300 group-hover:text-secondary transition-colors">2014</span>
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Marco Social</span>
                <div className="h-full w-0.5 bg-border mt-4 hidden md:block group-hover:bg-secondary/50 transition-colors"></div>
            </div>

            <div className="md:w-3/4">
                <Card className="border-none shadow-xl shadow-slate-200/50 bg-white">
                    <div className="bg-secondary h-2 w-full"></div>
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-amber-50 text-secondary-foreground/80 rounded-lg"><Star size={24}/></div>
                            <h2 className="text-2xl font-bold text-foreground">Ganhando as Ruas</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            Foi um ano decisivo. Participamos do <strong>Desfile Cívico</strong>. A Umbanda saiu de dentro de casa e se mostrou para a sociedade, transformando medo em respeito.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* 2015: Candomblé (Roxo/Turquesa) */}
        <div className="flex flex-col md:flex-row gap-6 mb-16 group">
            <div className="md:w-1/4 flex flex-col items-center md:items-end text-center md:text-right pt-2">
                <span className="text-4xl font-black text-slate-300 group-hover:text-purple-600 transition-colors">2015</span>
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">A Iniciação</span>
                <div className="h-full w-0.5 bg-border mt-4 hidden md:block group-hover:bg-purple-200 transition-colors"></div>
            </div>

            <div className="md:w-3/4">
                <Card className="border-none shadow-xl shadow-slate-200/50 bg-white">
                    <div className="bg-purple-600 h-2 w-full"></div>
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><MapPin size={24}/></div>
                            <h2 className="text-2xl font-bold text-foreground">O Chamado de Odé</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                            A estrada sacerdotal exige evolução. Fui recolhido e iniciado para o Orixá <strong>Odé (Oxóssi)</strong> no Candomblé Ketu.
                        </p>
                        
                        <div className="bg-muted/30 p-6 rounded-xl border-l-4 border-purple-500 relative italic text-foreground/80">
                            <Quote className="absolute top-4 right-4 text-muted h-8 w-8" />
                            "Trouxemos para Groaíras a organização, a liturgia e os fundamentos ancestrais do Candomblé."
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* HOJE: O Legado */}
        <div className="flex flex-col md:flex-row gap-6 group">
            <div className="md:w-1/4 flex flex-col items-center md:items-end text-center md:text-right pt-2">
                <span className="text-4xl font-black text-slate-300 group-hover:text-primary transition-colors">Hoje</span>
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">O Legado</span>
            </div>

            <div className="md:w-3/4">
                <Card className="bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-primary rounded-full blur-[100px] opacity-20"></div>
                    
                    <CardContent className="p-8 md:p-10 relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-white/10 text-secondary rounded-lg backdrop-blur-sm"><Hammer size={24}/></div>
                            <h2 className="text-2xl md:text-3xl font-bold">Erguendo o Ilè Asé</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-lg mb-6">
                            Desde 2022, vivemos o ápice dessa jornada. Estamos construindo o <strong>Ilè Asé Ègbé L'ajò Odé Igbò</strong>.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Badge variant="outline" className="text-secondary border-secondary/50 py-2 px-4 justify-center bg-secondary/10">
                                Em Construção
                            </Badge>
                            <Badge variant="outline" className="text-white border-white/30 py-2 px-4 justify-center">
                                Piedade/Encantado - RJ
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

      </div>
    </div>
  );
}