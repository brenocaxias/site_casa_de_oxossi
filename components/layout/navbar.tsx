'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-all duration-300">
      <div className="container flex h-16 items-center justify-between px-4">
        
        {/* Logo e Título */}
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

        {/* Menu Desktop */}
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
            {/* BOTÃO AGORA É AZUL (bg-blue-600) */}
            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 shadow-md transition-transform hover:scale-105">
              Área do Filho
            </Button>
          </Link>
        </nav>

        {/* Botão Mobile */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile (Dropdown) */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b shadow-xl animate-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col p-4 gap-4 text-center">
            <Link 
              href="/" 
              className="p-3 hover:bg-slate-50 rounded-lg text-slate-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Início
            </Link>
            
            <Link 
              href="/historia" 
              className="p-3 hover:bg-slate-50 rounded-lg text-slate-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Nossa História
            </Link>

            <Link 
              href="/doutrina" 
              className="p-3 hover:bg-slate-50 rounded-lg text-slate-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Doutrina & Fundamentos
            </Link>
            
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              {/* BOTÃO AZUL TAMBÉM NO CELULAR */}
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full">
                Acessar Área do Filho
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}