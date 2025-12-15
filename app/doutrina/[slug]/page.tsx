import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Share2, Calendar, Sparkles } from "lucide-react";

// --- BANCO DE DADOS COMPLETO ---
const dbArtigos: Record<string, any> = {
  // --- ORIXÁS ---
  "exu": {
    titulo: "Exu: O Mensageiro",
    subtitulo: "Orixá da comunicação, do movimento e da abertura de caminhos.",
    cor: "bg-red-950",
    texto: `
      <p>Exu não é o diabo. Exu é o movimento, a dinâmica, a comunicação. Sem Exu, nada se faz, pois ele é o mensageiro que leva os pedidos aos Orixás. Ele é o primeiro a ser saudado em qualquer ritual (Padê).</p>
      <h3>O Guardião da Porteira</h3>
      <p>Ele protege a casa, a entrada e a saída. Sua cor é o vermelho e o preto, simbolizando a terra e o fogo.</p>
    `
  },
  "ogum": {
    titulo: "Ogum: O Guerreiro",
    subtitulo: "Senhor do ferro, da tecnologia e da abertura de estradas.",
    cor: "bg-blue-900",
    texto: `
      <p>Ogum é o Orixá da guerra, da coragem e do trabalho. Ele é o dono dos metais; sem Ogum não existe a agricultura (enxada), a medicina (bisturi) ou a tecnologia moderna.</p>
      <h3>O Vencedor de Demandas</h3>
      <p>É invocado para abrir caminhos difíceis e trazer proteção contra inimigos físicos e espirituais. Sua saudação é "Ogunhê!".</p>
    `
  },
  "oxossi": {
    titulo: "Oxóssi: O Rei de Ketu",
    subtitulo: "O caçador de uma flecha só, provedor da prosperidade.",
    cor: "bg-green-600",
    texto: `
      <p>Oxóssi (Ode) é o orixá da caça, das florestas e da fartura. Ele garante que nunca falte o alimento na mesa de seus filhos. É associado à esperteza, à estratégia e ao conhecimento.</p>
      <h3>A Flecha Certeira</h3>
      <p>Conta a lenda que Oxóssi salvou seu povo matando o pássaro da feitiçaria com uma única flecha, por isso é chamado de "O Caçador de uma flecha só".</p>
    `
  },
  "ossain": {
    titulo: "Ossain: Senhor das Ervas",
    subtitulo: "O detentor do segredo de todas as folhas e da cura.",
    cor: "bg-green-500",
    texto: `
      <p>"Ko si ewe, ko si Orixá" (Sem folha, não há Orixá). Ossain é o mágico das ervas. Nenhuma cerimônia é feita sem a sua permissão, pois o Axé está nas plantas.</p>
    `
  },
  "obaluaie": {
    titulo: "Obaluaiê: Senhor da Terra",
    subtitulo: "Orixá da cura, da terra e da transformação.",
    cor: "bg-stone-800",
    texto: `
      <p>Também conhecido como Omulu, é o senhor das doenças e da cura. Ele rege a terra, o sol quente e a passagem dos espíritos. Seu corpo é coberto de palha da costa para esconder seu brilho intenso.</p>
      <p>É o médico dos pobres. Sua saudação "Atotô!" pede silêncio e respeito.</p>
    `
  },
  "oxumare": {
    titulo: "Oxumaré: O Arco-Íris",
    subtitulo: "A cobra e o arco-íris. Senhor da riqueza e dos ciclos.",
    cor: "bg-yellow-500",
    texto: `
      <p>Oxumaré representa a continuidade, o movimento constante. Ele é a cobra que morde a própria cauda. Rege a riqueza, não apenas material, mas a riqueza da vida que se renova.</p>
    `
  },
  "nana-buruque": {
    titulo: "Nanã Buruquê: A Ancestral",
    subtitulo: "A mais velha das Iabás. Senhora da lama primordial.",
    cor: "bg-purple-900",
    texto: `
      <p>Nanã é a avó dos Orixás. Ela é a lama do fundo dos rios, a matéria-prima da qual os homens foram moldados. Representa a sabedoria dos mais velhos, a paciência e a reencarnação.</p>
    `
  },
  "xango": {
    titulo: "Xangô: A Justiça",
    subtitulo: "Rei de Oyó. Senhor do trovão, do fogo e da justiça.",
    cor: "bg-red-700",
    texto: `
      <p>Xangô é o rei que não tolera mentiras. Seu machado de duas lâminas (Oxé) mostra que a justiça corta para os dois lados: quem deve paga, quem merece recebe.</p>
      <p>Ele rege o fogo, as pedreiras e a política. "Kaô Kabecilê!" é sua saudação real.</p>
    `
  },
  "oya-iansa": {
    titulo: "Iansã (Oyá): Os Ventos",
    subtitulo: "Guerreira, senhora das tempestades e dos eguns.",
    cor: "bg-orange-600",
    texto: `
      <p>Oyá é a mulher que não teme a morte. Ela guia os espíritos (Eguns) para o outro lado. É a dona dos ventos, dos raios e das tempestades.</p>
    `
  },
  "oxum": {
    titulo: "Oxum: O Amor e o Ouro",
    subtitulo: "Rainha da água doce, da beleza e da fertilidade.",
    cor: "bg-yellow-400",
    texto: `
      <p>Oxum é a mãe que acolhe, que chora pelos filhos e que nos ensina o amor. Dona do ouro e das águas dos rios. Ela rege a fecundidade e a gestação.</p>
    `
  },
  "oba": {
    titulo: "Obá: A Guerreira",
    subtitulo: "Representa a força física, a lealdade e as águas revoltas.",
    cor: "bg-rose-700",
    texto: `
      <p>Obá é uma orixá guerreira, forte e extremamente leal. Ela luta ao lado de Xangô. Representa o amor sofrido, mas verdadeiro, e a luta da mulher.</p>
    `
  },
  "ewa": {
    titulo: "Ewá: A Vidência",
    subtitulo: "Senhora do horizonte, da neblina e das transformações.",
    cor: "bg-pink-600",
    texto: `
      <p>Ewá é a bela virgem que se transformou em neblina para fugir. Ela rege o sexto sentido, a vidência e o que os olhos não podem ver nitidamente.</p>
    `
  },
  "logun-ede": {
    titulo: "Logun Edé: O Príncipe",
    subtitulo: "O encanto da floresta e a doçura do rio.",
    cor: "bg-cyan-600",
    texto: `
      <p>Filho de Oxum e Oxóssi, Logun herdou a beleza da mãe e a habilidade de caça do pai. Ele vive 6 meses nas matas e 6 meses nos rios.</p>
    `
  },
  "iemanja": {
    titulo: "Iemanjá: Mãe de Cabeças",
    subtitulo: "Rainha do mar, mãe de quase todos os Orixás.",
    cor: "bg-blue-400",
    texto: `
      <p>Odoyá! Iemanjá é a grande mãe. Seus seios alimentaram a criação. Ela rege o equilíbrio emocional, a família e o mar.</p>
      <p>É a ela que recorremos quando precisamos de colo e conforto mental. Dona das cabeças (Ori).</p>
    `
  },
  "oxala": {
    titulo: "Oxalá: O Pai Maior",
    subtitulo: "Pai da criação, da paz, da brancura e da fé.",
    cor: "bg-slate-300",
    texto: `
      <p>Oxalá é o pai de todos. O ar que respiramos. Ele representa a paz, a ética e a moral. Sua cor é o branco, a soma de todas as cores.</p>
      <p>"Epa Babá!" Ele pede calma, silêncio e respeito ao próximo.</p>
    `
  },
  "tempo-iroko": {
    titulo: "Tempo (Iroko): A Eternidade",
    subtitulo: "Orixá árvore, representa o tempo e a ancestralidade.",
    cor: "bg-stone-500",
    texto: `
      <p>Iroko é a árvore sagrada, a primeira a ser plantada. Ele é o tempo cronológico e o tempo climático. Nada acontece fora do tempo de Iroko.</p>
    `
  },
  
    "pretos-velhos": {
    titulo: "Pretos Velhos: A Sabedoria",
    subtitulo: "Adorei as Almas! A humildade, a paciência e a caridade ancestral.",
    cor: "bg-slate-800", // Preto/Branco (Simbolizado pelo cinza escuro)
    texto: `
      <p>Os Pretos Velhos são entidades de luz que se apresentam como anciãos africanos. Eles representam a sabedoria adquirida através do sofrimento e da experiência. São os psicólogos da Umbanda, mestres na arte de ouvir e aconselhar.</p>
      <h3>O Poder da Cura</h3>
      <p>Através da fumaça do cachimbo e de suas rezas com arruda e guiné, eles limpam a aura dos consulentes, desfazendo cargas negativas, inveja e trazendo paz de espírito. Eles ensinam que a humildade é a chave para a evolução.</p>
    `
  },
  "caboclos": {
    titulo: "Caboclos: A Força da Mata",
    subtitulo: "Okê Caboclo! A cura através das ervas e a energia viril das florestas.",
    cor: "bg-green-700", // Verde Mata
    texto: `
      <p>Os Caboclos são espíritos de indígenas e mestiços que trabalham na caridade com a vibração de Oxóssi. Eles trazem a energia pura das matas, a vitalidade e a coragem para enfrentar os obstáculos da vida.</p>
      <h3>O Passe e as Ervas</h3>
      <p>São exímios curadores, utilizando o conhecimento ancestral das ervas e banhos. Seus passes são vigorosos, focados em "quebrar" demandas, limpar o corpo físico e reenergizar o espírito. O brado do Caboclo é um mantra que afasta espíritos obsessores.</p>
    `
  },
  "eres": {
    titulo: "Erês: A Pureza",
    subtitulo: "Oni Beijada! A renovação das energias através da alegria das crianças.",
    cor: "bg-pink-400", // Rosa (ou Azul claro)
    texto: `
      <p>Não se engane com a brincadeira: os Erês (Crianças) realizam trabalhos seríssimos de descarrego e cura. A alegria é a arma mais poderosa contra a tristeza e a depressão. Eles manipulam energias densas com leveza, transformando o ambiente pesado em luz.</p>
      <p>São sincretizados com São Cosme e Damião e trazem a mensagem de que para evoluir, precisamos manter o coração puro e a capacidade de sorrir diante da vida.</p>
    `
  },
  "esquerda": {
    titulo: "Esquerda: Os Guardiões",
    subtitulo: "Laroyê! A proteção, a vitalidade e a execução da Lei Divina.",
    cor: "bg-red-900", // Vermelho e Preto
    texto: `
      <p>A Linha de Esquerda (Exus, Pombagiras e Exus-Mirins) não trabalha para o mal. Pelo contrário, eles são os guardiões e os policiais do astral. Eles lidam com as energias mais densas, protegem os terreiros contra ataques e abrem os caminhos para quem merece.</p>
      <h3>Vitalidade e Abertura</h3>
      <p>Trabalham questões materiais, amorosas, profissionais e de proteção. Eles estão mais próximos da nossa vibração humana, por isso agem com rapidez. Ensinam que precisamos ter pé no chão e força para viver no mundo material sem nos perdermos.</p>
    `
  },

  // (Aqui fecha a chave do dbArtigos)
};




// CORREÇÃO PARA NEXT.JS 15: "params" agora é uma Promise!
export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 1. Esperamos o Next resolver os parâmetros da URL
  const { slug } = await params; 
  
  // 2. Buscamos no nosso "banco"
  const artigo = dbArtigos[slug];

  // 3. Fallback se não achar (com DEBUG para te ajudar a ver o erro)
  if (!artigo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6 bg-slate-50">
        <h1 className="text-4xl font-bold text-slate-800">Orixá não encontrado</h1>
        <p className="text-slate-500">
          O sistema buscou por: <code className="bg-slate-200 px-2 py-1 rounded font-mono text-pink-600">{slug}</code>
        </p>
        <p className="text-sm text-slate-400">Verifique se o nome no arquivo anterior está igual ao da lista acima.</p>
        <Link href="/doutrina"><Button size="lg">Voltar para a Biblioteca</Button></Link>
      </div>
    );
  }

  // 4. Renderização da Página
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b h-16 flex items-center">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/doutrina">
            <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-primary transition-colors">
              <ChevronLeft size={20} /> Voltar
            </Button>
          </Link>
          <div className="flex gap-2">
             <Button variant="outline" size="icon" className="rounded-full">
                <Share2 size={18} />
             </Button>
          </div>
        </div>
      </header>

      <article className="animate-in fade-in duration-500">
        {/* Capa Hero */}
        <div className={`w-full py-20 md:py-32 ${artigo.cor} relative flex items-center justify-center overflow-hidden`}>
           <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
           
           <div className="container px-4 relative z-10 text-white text-center">
              <div className="inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur px-3 py-1 rounded-full text-sm font-medium mb-6">
                <Sparkles size={14} /> Doutrina & Fundamento
              </div>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-xl">
                {artigo.titulo.split(':')[0]}
              </h1>
              <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
                {artigo.subtitulo}
              </p>
           </div>
        </div>

        {/* Conteúdo */}
        <div className="container mx-auto px-4 -mt-10 relative z-20">
          <div className="bg-white rounded-t-3xl shadow-xl max-w-4xl mx-auto p-8 md:p-12 min-h-[500px]">
            <div className="flex items-center gap-2 mb-8 text-slate-400 text-sm uppercase tracking-widest font-bold">
               <Calendar size={16} /> Leitura Sagrada
            </div>

            <div 
              className="prose prose-slate prose-lg md:prose-xl mx-auto leading-relaxed text-slate-600 
              first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left"
              dangerouslySetInnerHTML={{ __html: artigo.texto }}
            />

            <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col items-center text-center gap-4">
               <h3 className="text-xl font-bold text-slate-800">Sente afinidade com {artigo.titulo.split(':')[0]}?</h3>
               <Button size="lg" className="rounded-full px-8 bg-primary shadow-lg hover:scale-105 transition-transform">
                 Agendar Jogo Agora
               </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}