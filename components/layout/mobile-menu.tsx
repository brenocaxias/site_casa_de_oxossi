'use client';

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão de Abrir/Fechar */}
      <button 
        className="md:hidden p-2 text-muted-foreground hover:bg-muted rounded-md transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menu"
      >
        {isOpen ? <X size={24} className="text-primary" /> : <Menu size={24} />}
      </button>

      {/* O Dropdown do Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b border-border shadow-xl animate-in slide-in-from-top-5 duration-200 z-50">
          <nav className="flex flex-col p-4 gap-4 text-center">
            <Link 
              href="/" 
              className="p-3 hover:bg-sky-50 hover:text-primary rounded-lg text-foreground font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Início
            </Link>
            
            <Link 
              href="/historia" 
              className="p-3 hover:bg-sky-50 hover:text-primary rounded-lg text-foreground font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Nossa História
            </Link>

            <Link 
              href="/doutrina" 
              className="p-3 hover:bg-sky-50 hover:text-primary rounded-lg text-foreground font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Doutrina & Fundamentos
            </Link>
            
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-sky-600 rounded-full font-bold shadow-lg">
                Acessar Área do Filho
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}