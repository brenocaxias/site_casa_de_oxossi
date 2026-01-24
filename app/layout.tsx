import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const baseUrl = 'https://www.egbelajo-odeigbo.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  
  title: {
    default: "Ilè Asé Ègbé L'ajò Odé Igbò | Casa de Oxóssi RJ",
    template: "%s | Ilè Asé Ègbé L'ajò"
  },
  
  description: 'Terreiro de Candomblé e Culto aos Orixás em Piedade/Encantado, RJ. Agende Jogo de Búzios, Trabalhos Espirituais e conheça nossa doutrina.',
  
  keywords: [
    'Candomblé', 'Jogo de Búzios', 'Terreiro RJ', 'Piedade', 'Encantado',
    'Ilè Asé Ègbé L ajò', 'Pai de Santo', 'Trabalhos Espirituais', 
    'Amarração', 'Limpeza Espiritual', 'Odé Igbò', 'Orixás', 'ile ase', 'casa de axé oxóssi',
    'ilé asé egbe lajo ode igbo', 'ile ase piedade rj', 'ilé asé Piedade rio de janeiro', 'ilé asé casa de oxóssi rio de janeiro',
    'egbe lajo piedade rj', 'egbe lajo piedade rio de janeiro', 'egbe lajo casa de oxossi groairas', 'Bàbá Edson de Oxóssi',
    'Baba edson de oxossi', 'baba Edson de oxossi', 'Maria Padilha das 7 encruzilhadas pai edson de oxossi', 
    'ebós', 'ebó limpeza', 'ebó saúde', 'saber meu orixá', 'saber meu pai de cabeça', 'saber minha mãe de cabeça',
    'egbe lajo ode igbo', "Ègbé L'ajò Odé Igbò", 'egbe lajo encantado rio de janeiro', 'egbe lajo casa de oxossi',
    'egbe lajo ode igbo encantado rj', 'egbe lajo ode igbo encantado rio de janeiro', ' ilè asè casa de oxóssi rio de janeiro',
    'terreiro de macumba em encantado rj', 'egbe lajo ode ibo', 'ebe lajó odé ibô', 'ile ase egbe lajo', 'ile ase egbe lajo ode igbo',
    'casa de oxossi groairas candomblea', 'terreiro de macumba casa de oxossi piedade rj', 'terreiro de macumba casa de oxossi encantado rj',
    'Pai Edson de Oxóssi', 'Bàbá Edson de Oxóssi', 'Bàbá Edson de Odé Igbò', 'Casa de Oxóssi Groairas', 'Mãe meire de Oyá',
    'Maria Padilha', 'Oxum', 'Exu', 'Preto Velho', 'Oxóssi rei de Ketu', 'Umbanda', 'Casa de Axé piedade rj',
    'casa de axé encantado rj', 'casa de axé rio de janeiro', 'casa de axé famosa', 'casa de axé boa em piedade rj',
    'casa de axé poderosa rj', 'casa de axé poderosa em piedade rio de janeiro', 'casa de oxóssi groaíras filial rj',
    'casa', 'axé', 'rio de janeiro', 'rj', 'piedade', 'encantado', 'macumba', 'búzios', 'orixá de cabeça',
    'quem é meu guia?', 'qual é minha pombogira?', 'como saber meu exu e minha pombogira'
  ],
  // --- ADICIONE ESTE BLOCO ABAIXO ---
  icons: {
    icon: '/icon.png',      // Ícone padrão do navegador
    shortcut: '/icon.png',  // Atalho
    apple: '/icon.png',     // Ícone para iPhone/iPad
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icon.png',
    },
  },
  // ---------------------------------
  
  authors: [{ name: 'Ilè Asé Ègbé L ajò' }],
  creator: 'Ilè Asé Ègbé L ajò',
  
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: baseUrl,
    siteName: "Ilè Asé Ègbé L'ajò Odé Igbò",
    title: "Ilè Asé Ègbé L'ajò Odé Igbò- Casa de Oxóssi RJ",
    description: 'Tradição, Fé e Ancestralidade. Agende sua consulta de Búzios.',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'Fachada do Ilè Asé Ègbé L ajò',
      },
    ],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // --- ÁREA NOVA PARA COLAR O CÓDIGO DO GOOGLE ---
  verification: {
    // Quando o Google Search Console te der o código HTML,
    // ele será algo como: <meta name="google-site-verification" content="XYZ123..." />
    // Você pega SÓ O CÓDIGO (o que está dentro das aspas do content) e cola aqui:
    google: 'PYXwnab2HHytdtUE31gd59iJR2Yc',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}