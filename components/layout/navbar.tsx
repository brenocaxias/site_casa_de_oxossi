import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 transition-all duration-300">
      <div className="container flex h-16 items-center justify-between px-4">
        
        {/* --- LADO ESQUERDO: LOGO --- */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
                src="/logo-footer.png" 
                alt="Logo Casa de Oxóssi" 
                width={50} 
                height={50} 
                className="h-10 w-auto md:h-12 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-bold text-lg md:text-xl text-foreground truncate max-w-[200px] md:max-w-none group-hover:text-primary transition-colors">
                Ilè Asé Ègbé L'ajò Odé Igbò
            </span>
          </Link>
        </div>

        {/* --- CENTRO: MENU DESKTOP --- */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors hover:underline underline-offset-4">
             Início
          </Link>
          <Link href="/historia" className="hover:text-primary transition-colors hover:underline underline-offset-4">
             Nossa História
          </Link>
          <Link href="/doutrina" className="hover:text-primary transition-colors hover:underline underline-offset-4">
             Doutrina
          </Link>
          <Link href="/dashboard">
            {/* Botão Dourado para destaque */}
            <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-amber-400 rounded-full px-6 shadow-md transition-transform hover:scale-105 font-bold">
              Área do Filho
            </Button>
          </Link>
        </nav>

        {/* --- LADO DIREITO: MENU MOBILE --- */}
        <MobileMenu />
        
      </div>
    </header>
  );
}