import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Star, Hammer, Leaf, ArrowRight } from "lucide-react";

export default function HistoriaPage() {
  // Dados da Linha do Tempo
  const timeline = [
    {
      ano: "2009",
      titulo: "A Semente Plantada",
      desc: "Fundação do Terreiro de Umbanda Pai José de Aruanda. O início humilde, familiar e cheio de fé em Groaíras.",
      icon: <Leaf className="text-green-600" />,
      cor: "bg-green-100 border-green-200"
    },
    {
      ano: "2014",
      titulo: "Reconhecimento Social",
      desc: "Primeira participação no Desfile Cívico do município. A Umbanda sai de casa e ganha as ruas e o respeito da sociedade.",
      icon: <Star className="text-yellow-600" />,
      cor: "bg-yellow-100 border-yellow-200"
    },
    {
      ano: "2015",
      titulo: "O Chamado do Candomblé",
      desc: "Iniciação para Odé (Oxóssi) no Candomblé Ketu em São Paulo. O início da transição litúrgica e aprofundamento nos fundamentos.",
      icon: <ArrowRight className="text-blue-600" />,
      cor: "bg-blue-100 border-blue-200"
    },
    {
      ano: "2022 - Hoje",
      titulo: "A Grande Construção",
      desc: "O nascimento do Ilè Asé Ègbé L'ajò Odé Igbò. A construção do templo definitivo para os Orixás.",
      icon: <Hammer className="text-purple-600" />,
      cor: "bg-purple-100 border-purple-200"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-slate-900 text-white py-20 px-4 text-center relative overflow-hidden">
        {/* Efeito de Fundo (Opcional) */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-sm uppercase tracking-widest">
            Nossa Trajetória
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Do Princípio à Expansão
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            A história de fé, resiliência e ancestralidade que transformou uma pequena casa de oração no grande Ilè Asé Ègbé L'ajò Odé Igbò.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        
        {/* --- TEXTO PRINCIPAL --- */}
        <div className="grid md:grid-cols-12 gap-8">
            
            {/* Coluna Esquerda: Texto */}
            <div className="md:col-span-7 space-y-8">
                <Card className="border-none shadow-lg">
                    <CardContent className="p-8 md:p-12 space-y-6 leading-relaxed text-slate-700 text-lg">
                        
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <MapPin className="text-blue-500"/> O Início da Jornada
                            </h2>
                            <p>
                                Muitos veem as paredes se erguendo hoje, mas os alicerces desta casa foram cavados muito antes, no solo fértil da fé. Nossa história começa em <strong className="text-blue-700">20 de janeiro de 2009</strong>, quando o Preto Velho Pai José de Aruanda fundou espiritualmente nossa primeira casa em Groaíras.
                            </p>
                            <p className="mt-4">
                                Naquela época, éramos o <em>Terreiro de Umbanda Pai José de Aruanda</em>. Tudo era simples, familiar, nascido dentro de casa e acolhido pelo amor da família, especialmente de minha esposa Maria Meirelande. Enfrentamos o preconceito com trabalho e amor, mudamos de endereço diversas vezes, mas nunca deixamos faltar o acolhimento a quem batia à nossa porta.
                            </p>
                        </div>

                        <hr className="border-slate-100" />

                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Star className="text-yellow-500"/> O Chamado do Orixá
                            </h2>
                            <p>
                                A estrada sacerdotal é feita de aprendizado constante. Em julho de 2015, um novo ciclo se iniciou. Fui recolhido e iniciado para o Orixá Odé (Oxóssi) no Candomblé de Nação Ketu, pelas mãos do Babalorixá Diego de Odé (SP).
                            </p>
                            <p className="mt-4">
                                Ali, a Casa de Oxóssi Groaíras começou a beber de uma fonte mais profunda. Trouxemos para Groaíras a organização, a liturgia e os fundamentos ancestrais do Candomblé, transformando o medo do desconhecido em respeito religioso.
                            </p>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 mt-6 italic text-slate-800">
                            "Não somos apenas uma construção de tijolos. Somos uma comunidade de fé que aprendeu que o sacerdócio exige abdicação e sabedoria."
                        </div>

                    </CardContent>
                </Card>
            </div>

            {/* Coluna Direita: Linha do Tempo Visual */}
            <div className="md:col-span-5">
                <div className="sticky top-24">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 px-2">Marcos Históricos</h3>
                    
                    <div className="space-y-6">
                        {timeline.map((item, index) => (
                            <div key={index} className="flex gap-4 group">
                                <div className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm z-10 ${item.cor}`}>
                                        {item.icon}
                                    </div>
                                    {index !== timeline.length - 1 && (
                                        <div className="w-0.5 h-full bg-slate-200 my-2 group-hover:bg-blue-200 transition-colors"></div>
                                    )}
                                </div>
                                <div className="pb-8">
                                    <Badge variant="outline" className="mb-2 bg-white">{item.ano}</Badge>
                                    <h4 className="font-bold text-lg text-slate-800">{item.titulo}</h4>
                                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Card de Construção */}
                    <Card className="bg-slate-900 text-white mt-8 border-none shadow-xl overflow-hidden relative">
                         <div className="absolute inset-0 bg-blue-600 opacity-20"></div>
                         <CardContent className="p-6 relative z-10">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <Hammer className="text-yellow-400"/> O Futuro é Agora
                            </h3>
                            <p className="text-sm text-slate-300 mb-4">
                                Estamos construindo o Ilè Asé Ègbé L'ajò Odé Igbò. Venha fazer parte dessa história.
                            </p>
                         </CardContent>
                    </Card>

                </div>
            </div>

        </div>
      </div>
    </div>
  );
}