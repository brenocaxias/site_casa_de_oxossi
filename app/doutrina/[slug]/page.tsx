import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Palette, Sparkles, Feather, Share2 } from "lucide-react";
import { BotaoVoltar } from "@/components/ui/botao-voltar";
import { AgendamentoPublico } from "@/components/agendamento-publico";

// --- BANCO DE DADOS COMPLETO (ORIXÁS + UMBANDA) ---
const orixasData: Record<string, {
  nome: string;
  titulo: string;
  descricao: string;
  dia: string;
  cores: string;
  saudacao: string;
  // Configuração de Cores (Tema)
  theme: {
    bgHero: string;       // Cor do Banner
    textHero: string;     // Cor do Texto no Banner (geralmente white)
    textPrincipal: string; // Cor do Título e Ícones (ex: text-yellow-600)
    bgLight: string;      // Cor de fundo dos icones (ex: bg-yellow-50)
    border: string;       // Cor da borda (ex: border-yellow-200)
    btnBg: string;        // Cor do botão de agendar
    btnHover: string;
  };
  historia: string;
}> = {
  // --- ORIXÁS ---
  "exu": {
    nome: "Exu",
    titulo: "O Mensageiro",
    descricao: "Orixá da comunicação, do movimento e da abertura de caminhos.",
    dia: "Segunda-feira",
    cores: "Preto e Vermelho",
    saudacao: "Laroyê Exu!",
    theme: { 
      bgHero: "bg-red-950", 
      textHero: "text-red-100", 
      textPrincipal: "text-red-700", 
      bgLight: "bg-red-50", 
      border: "border-red-200",
      btnBg: "bg-red-900",
      btnHover: "hover:bg-red-950"
    },
    historia: "Exu não é o diabo. Exu é o movimento, a dinâmica, a comunicação. Sem Exu, nada se faz, pois ele é o mensageiro que leva os pedidos aos Orixás. Ele protege a casa, a entrada e a saída. Sua cor é o vermelho e o preto, simbolizando a terra e o fogo."
  },
  "ogum": {
    nome: "Ogum",
    titulo: "O Guerreiro",
    descricao: "Senhor do ferro, da tecnologia e da abertura de estradas.",
    dia: "Terça-feira",
    cores: "Azul Escuro ou Vermelho",
    saudacao: "Ogunhê!",
    theme: { 
      bgHero: "bg-blue-900", 
      textHero: "text-blue-50", 
      textPrincipal: "text-blue-700", 
      bgLight: "bg-blue-50", 
      border: "border-blue-200",
      btnBg: "bg-blue-800",
      btnHover: "hover:bg-blue-900"
    },
    historia: "Ogum é o orixá ferreiro, senhor dos metais e da guerra. Foi ele quem ensinou aos homens a forjar o ferro para a agricultura e para a caça. É o abridor de caminhos e vencedor de demandas."
  },
  "oxossi": {
    nome: "Oxóssi",
    titulo: "O Caçador",
    descricao: "Rei de Ketu, provedor da fartura, da caça e do conhecimento.",
    dia: "Quinta-feira",
    cores: "Verde e Azul Turquesa",
    saudacao: "Okê Arô!",
    theme: { 
      bgHero: "bg-green-700", 
      textHero: "text-green-50", 
      textPrincipal: "text-green-700", 
      bgLight: "bg-green-50", 
      border: "border-green-200",
      btnBg: "bg-green-700",
      btnHover: "hover:bg-green-800"
    },
    historia: "Oxóssi é o caçador de uma flecha só. Orixá da fartura, vive nas matas e conhece todos os seus segredos. É ele quem garante o sustento da tribo. Conta a lenda que ele salvou seu povo matando o pássaro das feiticeiras com um único tiro."
  },
  "ossain": {
    nome: "Ossain",
    titulo: "Senhor das Ervas",
    descricao: "Detentor do segredo de todas as folhas e da cura litúrgica.",
    dia: "Quinta-feira",
    cores: "Verde e Branco",
    saudacao: "Ewé Ó!",
    theme: { 
      bgHero: "bg-emerald-600", 
      textHero: "text-emerald-50", 
      textPrincipal: "text-emerald-700", 
      bgLight: "bg-emerald-50", 
      border: "border-emerald-200",
      btnBg: "bg-emerald-600",
      btnHover: "hover:bg-emerald-700"
    },
    historia: "Sem folha não tem Orixá. Ossain é o mago das ervas, aquele que conhece o poder de cura e de axé de cada planta. Nenhum ritual acontece sem sua permissão."
  },
  "omolu-obaluaye": {
    nome: "Omolu / Obaluaiê",
    titulo: "Senhor da Terra",
    descricao: "Orixá da cura, da terra e da passagem entre os mundos.",
    dia: "Segunda-feira",
    cores: "Preto, Branco e Vermelho",
    saudacao: "Atotô!",
    theme: { 
      bgHero: "bg-stone-800", 
      textHero: "text-stone-100", 
      textPrincipal: "text-stone-700", 
      bgLight: "bg-stone-100", 
      border: "border-stone-300",
      btnBg: "bg-stone-800",
      btnHover: "hover:bg-stone-900"
    },
    historia: "Obaluaiê é o sol do meio-dia, o senhor da terra quente. Orixá respeitado que rege a saúde e as doenças. Debaixo de sua palha, guarda os mistérios da vida e da morte. É o médico dos pobres."
  },
  "oxumare": {
    nome: "Oxumaré",
    titulo: "O Arco-Íris",
    descricao: "Senhor dos ciclos, da riqueza, do movimento e da transformação.",
    dia: "Terça-feira",
    cores: "Todas as cores do Arco-Íris",
    saudacao: "Arroboboi!",
    theme: { 
      bgHero: "bg-yellow-500", 
      textHero: "text-yellow-950", 
      textPrincipal: "text-yellow-600", 
      bgLight: "bg-yellow-50", 
      border: "border-yellow-200",
      btnBg: "bg-yellow-500",
      btnHover: "hover:bg-yellow-600"
    },
    historia: "Oxumaré é a cobra que morde a própria cauda, representando a continuidade e os ciclos. Ele leva a água da terra para o céu em forma de vapor e a devolve como chuva. Representa a riqueza e a renovação."
  },
  "nana-buruque": {
    nome: "Nanã Buruquê",
    titulo: "A Ancestral",
    descricao: "A mais velha das Iabás. Senhora da lama primordial e da sabedoria.",
    dia: "Sábado ou Terça",
    cores: "Lilás, Roxo e Branco",
    saudacao: "Saluba Nanã!",
    theme: { 
      bgHero: "bg-purple-800", 
      textHero: "text-purple-100", 
      textPrincipal: "text-purple-800", 
      bgLight: "bg-purple-50", 
      border: "border-purple-200",
      btnBg: "bg-purple-800",
      btnHover: "hover:bg-purple-900"
    },
    historia: "Nanã é a avó dos Orixás. De suas lamas (o barro primordial) foi moldado o ser humano. Ela rege a sabedoria dos mais velhos, a paciência e o recomeço."
  },
  "xango": {
    nome: "Xangô",
    titulo: "A Justiça",
    descricao: "Rei de Oyó. Senhor do trovão, do fogo e da justiça divina.",
    dia: "Quarta-feira",
    cores: "Vermelho e Branco (ou Marrom)",
    saudacao: "Kaô Kabecilê!",
    theme: { 
      bgHero: "bg-red-800", 
      textHero: "text-white", 
      textPrincipal: "text-red-800", 
      bgLight: "bg-red-50", 
      border: "border-red-200",
      btnBg: "bg-red-800",
      btnHover: "hover:bg-red-900"
    },
    historia: "Xangô é o rei justiceiro. Não tolera a mentira nem a traição. Seu machado de duas lâminas mostra que a justiça vale para todos, inclusive para quem a aplica. Rege as pedreiras e a política."
  },
  "iansa": {
    nome: "Iansã (Oyá)",
    titulo: "Os Ventos",
    descricao: "Guerreira, senhora dos ventos, das tempestades e dos eguns.",
    dia: "Quarta-feira",
    cores: "Vermelho, Laranja ou Coral",
    saudacao: "Eparrey!",
    theme: { 
      bgHero: "bg-orange-600", 
      textHero: "text-white", 
      textPrincipal: "text-orange-600", 
      bgLight: "bg-orange-50", 
      border: "border-orange-200",
      btnBg: "bg-orange-600",
      btnHover: "hover:bg-orange-700"
    },
    historia: "Oyá é a mulher búfalo, guerreira destemida que divide o poder do fogo com Xangô. Ela encaminha os espíritos e limpa o mundo com seus ventos fortes. Não teme a morte."
  },
  "oxum": {
    nome: "Oxum",
    titulo: "O Amor e o Ouro",
    descricao: "Rainha da água doce, dona do ouro, da beleza e da fertilidade.",
    dia: "Sábado",
    cores: "Amarelo Ouro",
    saudacao: "Ora Yê Yê Ô!",
    theme: { 
      bgHero: "bg-yellow-400", 
      textHero: "text-yellow-900", 
      textPrincipal: "text-yellow-600", 
      bgLight: "bg-yellow-50", 
      border: "border-yellow-200",
      btnBg: "bg-yellow-500",
      btnHover: "hover:bg-yellow-600"
    },
    historia: "Oxum é a mãe que acolhe, a senhora da diplomacia e do amor. Dona das cachoeiras, ela nos ensina que a água mole em pedra dura tanto bate até que fura. Rege a fecundidade."
  },
  "logun-ede": {
    nome: "Logun Edé",
    titulo: "O Príncipe",
    descricao: "Filho de Oxum e Oxóssi, carrega a beleza e a habilidade da caça.",
    dia: "Quinta-feira",
    cores: "Azul Turquesa e Amarelo",
    saudacao: "Loci Loci!",
    theme: { 
      bgHero: "bg-cyan-600", 
      textHero: "text-white", 
      textPrincipal: "text-cyan-600", 
      bgLight: "bg-cyan-50", 
      border: "border-cyan-200",
      btnBg: "bg-cyan-600",
      btnHover: "hover:bg-cyan-700"
    },
    historia: "Logun é o encanto, a beleza e a fartura. Vive seis meses nas matas com o pai Oxóssi e seis meses nos rios com a mãe Oxum, reunindo o axé de ambos."
  },
  "iemanja": {
    nome: "Iemanjá",
    titulo: "Mãe de Cabeças",
    descricao: "Rainha do mar, mãe de quase todos os Orixás e do equilíbrio emocional.",
    dia: "Sábado",
    cores: "Azul Claro, Branco e Prata",
    saudacao: "Odoyá!",
    theme: { 
      bgHero: "bg-sky-400", 
      textHero: "text-white", 
      textPrincipal: "text-sky-500", 
      bgLight: "bg-sky-50", 
      border: "border-sky-200",
      btnBg: "bg-sky-400",
      btnHover: "hover:bg-sky-500"
    },
    historia: "Iemanjá é a grande mãe, aquela que tem os seios fartos para alimentar todos os filhos. Suas águas salgadas lavam nossas dores e trazem o equilíbrio mental. Dona dos Oris (cabeças)."
  },
  "oxala": {
    nome: "Oxalá",
    titulo: "O Pai Maior",
    descricao: "Pai da criação, da paz, da brancura e da fé.",
    dia: "Sexta-feira",
    cores: "Branco",
    saudacao: "Epa Babá!",
    theme: { 
      bgHero: "bg-slate-200", 
      textHero: "text-slate-600", 
      textPrincipal: "text-slate-600", 
      bgLight: "bg-slate-100", 
      border: "border-slate-300",
      btnBg: "bg-slate-800",
      btnHover: "hover:bg-slate-900"
    },
    historia: "Oxalá é o ar que respiramos, a paz que buscamos. O grande pai da humanidade, que nos cobre com seu manto branco de misericórdia e sabedoria. Representa a ética e a moral."
  },

  // --- FALANGES DE UMBANDA ---
  "pretos-velhos": {
    nome: "Pretos Velhos",
    titulo: "A Sabedoria",
    descricao: "Entidades de luz que representam a humildade, a paciência e a caridade.",
    dia: "Segunda-feira (Almas)",
    cores: "Preto e Branco",
    saudacao: "Adorei as Almas!",
    theme: { 
      bgHero: "bg-slate-800", 
      textHero: "text-slate-100", 
      textPrincipal: "text-slate-700", 
      bgLight: "bg-slate-100", 
      border: "border-slate-300",
      btnBg: "bg-slate-800",
      btnHover: "hover:bg-slate-900"
    },
    historia: "Os Pretos Velhos são os psicólogos da Umbanda. Espíritos de antigos escravizados que, através do sofrimento, alcançaram a evolução. Com seu cachimbo e suas ervas (arruda e guiné), eles curam as dores da alma e ensinam que a humildade vence qualquer demanda."
  },
  "caboclos": {
    nome: "Caboclos",
    titulo: "A Força da Mata",
    descricao: "Espíritos guerreiros que trazem a energia vital da floresta e a cura.",
    dia: "Quinta-feira",
    cores: "Verde e Branco (ou Vermelho)",
    saudacao: "Okê Caboclo!",
    theme: { 
      bgHero: "bg-green-700", 
      textHero: "text-green-50", 
      textPrincipal: "text-green-700", 
      bgLight: "bg-green-50", 
      border: "border-green-200",
      btnBg: "bg-green-700",
      btnHover: "hover:bg-green-800"
    },
    historia: "Os Caboclos são a linha de frente da Umbanda. Espíritos de índios e mestiços que trabalham na vibração de Oxóssi. Eles são rápidos, diretos e usam o poder das ervas e dos passes magnéticos para limpar a aura e dar força para enfrentarmos a vida."
  },
  "eres": {
    nome: "Erês (Crianças)",
    titulo: "Pureza e Alegria",
    descricao: "A renovação das energias através da inocência e da alegria sagrada.",
    dia: "Domingo",
    cores: "Rosa e Azul Claro",
    saudacao: "Oni Beijada!",
    theme: { 
      bgHero: "bg-pink-400", 
      textHero: "text-pink-50", 
      textPrincipal: "text-pink-500", 
      bgLight: "bg-pink-50", 
      border: "border-pink-200",
      btnBg: "bg-pink-500",
      btnHover: "hover:bg-pink-600"
    },
    historia: "Não se engane com a brincadeira: os Erês realizam trabalhos seríssimos de descarrego. A alegria é uma arma poderosa contra a depressão e energias densas. Eles manipulam a energia com leveza, transformando o ambiente pesado em luz num estalar de dedos."
  },
  "esquerda": {
    nome: "Esquerda (Guardiões)",
    titulo: "A Lei e Proteção",
    descricao: "Exus e Pombagiras de Lei. A proteção, a vitalidade e a abertura de caminhos.",
    dia: "Segunda-feira",
    cores: "Preto e Vermelho",
    saudacao: "Laroyê!",
    theme: { 
      bgHero: "bg-red-900", 
      textHero: "text-red-50", 
      textPrincipal: "text-red-800", 
      bgLight: "bg-red-50", 
      border: "border-red-200",
      btnBg: "bg-red-900",
      btnHover: "hover:bg-red-950"
    },
    historia: "A Esquerda na Umbanda não é o mal; é a polícia do astral. São espíritos que trabalham na densidade para proteger o terreiro e seus filhos. Eles lidam com a realidade da vida: trabalho, amor e defesa. Ensinam que precisamos ter força para viver no mundo material."
  },
};

export default async function OrixaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const orixa = orixasData[slug];

  if (!orixa) {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6 bg-slate-50">
          <h1 className="text-4xl font-bold text-slate-800">Entidade não encontrada</h1>
          <p className="text-slate-500">
            O sistema buscou por: <code className="bg-slate-200 px-2 py-1 rounded font-mono text-pink-600">{slug}</code>
          </p>
          <Link href="/doutrina"><Button size="lg">Voltar para a Biblioteca</Button></Link>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Fixo com Botão Voltar */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b h-16 flex items-center">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <BotaoVoltar />
          <div className="flex gap-2">
             <Button variant="outline" size="icon" className="rounded-full">
                <Share2 size={18} />
             </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Banner Hero com Cor Dinâmica */}
        <div className={`w-full py-20 ${orixa.theme.bgHero} relative flex flex-col items-center justify-center overflow-hidden text-center`}>
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
            <div className="relative z-10 px-4">
                <Badge className={`${orixa.theme.bgLight} ${orixa.theme.textPrincipal} ${orixa.theme.border} border px-4 py-1 text-base uppercase tracking-widest mb-6`}>
                    {orixa.saudacao}
                </Badge>
                <h1 className={`text-5xl md:text-7xl font-extrabold ${orixa.theme.textHero} tracking-tight mb-4`}>
                    {orixa.nome}
                </h1>
                <p className={`text-xl ${orixa.theme.textHero} opacity-90 max-w-2xl mx-auto font-light`}>
                    {orixa.titulo}
                </p>
            </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12 -mt-10 relative z-20">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* CARDS DE INFORMAÇÃO (VOLTARAM!) */}
            <div className="grid md:grid-cols-3 gap-6">
                
                {/* Card Dia */}
                <Card className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow bg-white">
                    <CardHeader className="pb-2">
                        <div className={`w-10 h-10 ${orixa.theme.bgLight} rounded-lg flex items-center justify-center mb-2`}>
                            <Calendar className={`h-5 w-5 ${orixa.theme.textPrincipal}`} />
                        </div>
                        <CardTitle className="text-sm font-bold text-slate-500 uppercase">Dia da Semana</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-semibold text-slate-800">{orixa.dia}</p>
                    </CardContent>
                </Card>

                {/* Card Cores */}
                <Card className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow bg-white">
                    <CardHeader className="pb-2">
                        <div className={`w-10 h-10 ${orixa.theme.bgLight} rounded-lg flex items-center justify-center mb-2`}>
                            <Palette className={`h-5 w-5 ${orixa.theme.textPrincipal}`} />
                        </div>
                        <CardTitle className="text-sm font-bold text-slate-500 uppercase">Cores</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-semibold text-slate-800">{orixa.cores}</p>
                    </CardContent>
                </Card>

                {/* Card Saudação */}
                <Card className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow bg-white">
                    <CardHeader className="pb-2">
                        <div className={`w-10 h-10 ${orixa.theme.bgLight} rounded-lg flex items-center justify-center mb-2`}>
                            <Sparkles className={`h-5 w-5 ${orixa.theme.textPrincipal}`} />
                        </div>
                        <CardTitle className="text-sm font-bold text-slate-500 uppercase">Saudação</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-semibold text-slate-800 italic">"{orixa.saudacao}"</p>
                    </CardContent>
                </Card>
            </div>

            {/* História e Fundamentos */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 mt-8">
                <div className="flex items-center gap-3 mb-6">
                    <Feather className={`h-8 w-8 ${orixa.theme.textPrincipal}`} />
                    <h2 className="text-2xl font-bold text-slate-800">História e Fundamentos</h2>
                </div>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg">
                    <p>{orixa.historia}</p>
                    <p className="mt-4">
                        (Mais lendas e itãs de {orixa.nome} serão adicionados ao acervo em breve...)
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
                    <h3 className="text-lg font-semibold text-slate-700">Gostaria de saber qual o seu Orixá?</h3>
                    
                    {/* Botão de Agendamento com Cor Dinâmica */}
                    <AgendamentoPublico 
                        textoBotao="Agendar Jogo de Búzios"
                        jogoPreSelecionado="buzios_completo"
                        className={`${orixa.theme.btnBg} ${orixa.theme.btnHover} text-white font-bold px-8 h-12 rounded-full shadow-lg border-none`}
                    />
                </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}