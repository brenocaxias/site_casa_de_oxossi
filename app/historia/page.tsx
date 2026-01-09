import Image from "next/image";
import Link from "next/link"; // <--- Importei o Link
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Hammer, ArrowDown, Quote, Star, Users } from "lucide-react";

export default function HistoriaPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* --- HERO SECTION: O Título Impactante --- */}
      <section className="bg-slate-900 text-white pt-16 pb-32 px-4 text-center relative overflow-hidden">
        {/* Padrão de Fundo Suave */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          
          {/* --- LOGO CENTRALIZADA COM LINK PARA HOME --- */}
          <Link href="/" className="mb-8 group" title="Voltar para o Início">
            <div className="bg-white/95 p-4 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:scale-110 group-hover:bg-white transition-all duration-300 cursor-pointer">
                <Image 
                    src="/logo-footer.png" 
                    alt="Logo Casa de Oxóssi" 
                    width={80} 
                    height={80} 
                    className="w-16 h-16 object-contain"
                />
            </div>
          </Link>

          <Badge className="bg-yellow-500 text-slate-900 px-4 py-1 text-sm uppercase tracking-widest font-bold hover:bg-yellow-600 mb-6">
            Nossa Trajetória
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Uma Jornada de Fé e Resiliência
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
            Do pequeno altar doméstico ao grande templo de Orixás. Conheça os passos que nos trouxeram até aqui.
          </p>
          
          <div className="flex justify-center pt-8 animate-bounce opacity-50">
            <ArrowDown size={32} />
          </div>
        </div>
      </section>

      {/* --- CONTEÚDO EM CAPÍTULOS (LINHA DO TEMPO) --- */}
      <div className="container mx-auto px-4 -mt-20 relative z-20 max-w-4xl">
        
        {/* CAPÍTULO 1: O INÍCIO (2009) */}
        <div className="flex flex-col md:flex-row gap-6 mb-16 group">
            {/* Coluna da Data (Esquerda) */}
            <div className="md:w-1/4 flex flex-col items-center md:items-end text-center md:text-right pt-2">
                <span className="text-4xl font-black text-slate-200 group-hover:text-blue-600 transition-colors">2009</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">A Fundação</span>
                <div className="h-full w-0.5 bg-slate-200 mt-4 hidden md:block group-hover:bg-blue-200"></div>
            </div>

            {/* Coluna do Conteúdo (Direita) */}
            <div className="md:w-3/4">
                <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="bg-blue-600 h-2 w-full"></div>
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg"><Users size={24}/></div>
                            <h2 className="text-2xl font-bold text-slate-800">A Semente Plantada</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-lg mb-4">
                            Em uma terça-feira sagrada, 20 de janeiro, o Preto Velho <strong>Pai José de Aruanda</strong> fundou espiritualmente nossa casa. Naquela época, éramos o <em>Terreiro de Umbanda Pai José de Aruanda</em>.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Tudo começou de forma simples, dentro de casa, acolhido pelo amor de minha esposa <strong>Maria Meirelande</strong>. Enfrentamos preconceitos e mudamos de endereço várias vezes, mas nunca deixamos de acolher quem batia à nossa porta em busca de auxílio.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* CAPÍTULO 2: O RECONHECIMENTO (2014) */}
        <div className="flex flex-col md:flex-row gap-6 mb-16 group">
            <div className="md:w-1/4 flex flex-col items-center md:items-end text-center md:text-right pt-2">
                <span className="text-4xl font-black text-slate-200 group-hover:text-yellow-500 transition-colors">2014</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Marco Social</span>
                <div className="h-full w-0.5 bg-slate-200 mt-4 hidden md:block group-hover:bg-yellow-200"></div>
            </div>

            <div className="md:w-3/4">
                <Card className="border-none shadow-xl shadow-slate-200/50">
                    <div className="bg-yellow-500 h-2 w-full"></div>
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg"><Star size={24}/></div>
                            <h2 className="text-2xl font-bold text-slate-800">Ganhando as Ruas</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Foi um ano decisivo. Participamos pela primeira vez do <strong>Desfile Cívico</strong> do município. A Umbanda saiu de dentro de casa e se mostrou para a sociedade, transformando o medo do desconhecido em respeito religioso.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* CAPÍTULO 3: O CANDOMBLÉ (2015) */}
        <div className="flex flex-col md:flex-row gap-6 mb-16 group">
            <div className="md:w-1/4 flex flex-col items-center md:items-end text-center md:text-right pt-2">
                <span className="text-4xl font-black text-slate-200 group-hover:text-purple-600 transition-colors">2015</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">A Iniciação</span>
                <div className="h-full w-0.5 bg-slate-200 mt-4 hidden md:block group-hover:bg-purple-200"></div>
            </div>

            <div className="md:w-3/4">
                <Card className="border-none shadow-xl shadow-slate-200/50">
                    <div className="bg-purple-600 h-2 w-full"></div>
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-100 text-purple-700 rounded-lg"><MapPin size={24}/></div>
                            <h2 className="text-2xl font-bold text-slate-800">O Chamado de Odé</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-lg mb-6">
                            A estrada sacerdotal exige evolução. Fui recolhido e iniciado para o Orixá <strong>Odé (Oxóssi)</strong> no Candomblé Ketu, pelas mãos do Babalorixá Diego de Odé (SP).
                        </p>
                        
                        <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-purple-500 relative italic text-slate-700">
                            <Quote className="absolute top-4 right-4 text-slate-200 h-8 w-8" />
                            "Trouxemos para Groaíras a organização, a liturgia e os fundamentos ancestrais do Candomblé, bebendo da fonte do Axé Oxumarê."
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* CAPÍTULO 4: HOJE (2022-ATUAL) */}
        <div className="flex flex-col md:flex-row gap-6 group">
            <div className="md:w-1/4 flex flex-col items-center md:items-end text-center md:text-right pt-2">
                <span className="text-4xl font-black text-slate-200 group-hover:text-green-600 transition-colors">Hoje</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">O Legado</span>
            </div>

            <div className="md:w-3/4">
                <Card className="bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
                    {/* Imagem de fundo sutil ou padrão */}
                    <div className="absolute top-0 right-0 p-32 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
                    
                    <CardContent className="p-8 md:p-10 relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-white/10 text-yellow-400 rounded-lg backdrop-blur-sm"><Hammer size={24}/></div>
                            <h2 className="text-2xl md:text-3xl font-bold">Erguendo o Ilè Asé</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-lg mb-6">
                            Desde 2022, vivemos o ápice dessa jornada. Estamos construindo o <strong>Ilè Asé Ègbé L'ajò Odé Igbò</strong>.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-8">
                            Não são apenas tijolos. É um templo definitivo para cultuar nossos Orixás com dignidade e continuar nosso papel social de transformar vidas.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Badge variant="outline" className="text-yellow-400 border-yellow-400/50 py-2 px-4 justify-center">
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