import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu"; // Importamos a parte interativa

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-all duration-300">
      <div className="container flex h-16 items-center justify-between px-4">
        
        {/* --- LADO ESQUERDO: LOGO (Estático) --- */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image 
                src="/logo-footer.png" 
                alt="Logo Casa de Oxóssi" 
                width={50} 
                height={50} 
                className="h-10 w-auto md:h-12 object-contain"
            />
            <span className="font-bold text-lg md:text-xl text-slate-900 truncate max-w-[200px] md:max-w-none">
                Ilè Asé Ègbé L'ajò Odé Igbò
            </span>
          </Link>
        </div>

        {/* --- CENTRO: MENU DESKTOP (Estático) --- */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors hover:underline underline-offset-4">
             Início
          </Link>
          <Link href="/historia" className="hover:text-blue-600 transition-colors hover:underline underline-offset-4">
             Nossa História
          </Link>
          <Link href="/doutrina" className="hover:text-blue-600 transition-colors hover:underline underline-offset-4">
             Doutrina
          </Link>
          <Link href="/dashboard">
            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 shadow-md transition-transform hover:scale-105">
              Área do Filho
            </Button>
          </Link>
        </nav>

        {/* --- LADO DIREITO: MENU MOBILE (Interativo) --- */}
        {/* Aqui chamamos o componente Cliente que criamos */}
        <MobileMenu />
        
      </div>
    </header>
  );
}