'use client';

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão de Abrir/Fechar (Só aparece no mobile) */}
      <button 
        className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* O Dropdown do Menu */}
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
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full">
                Acessar Área do Filho
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}