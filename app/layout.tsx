import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Ilè Asé Ègbé L'ajò - Odé Igbò",
  description: 'Casa de Culto aos Orixás. Tradição, Fé e Ancestralidade.',
  icons: {
    icon: '/logo-footer.png', // Isso faz a logomarca aparecer na aba também!
  }
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