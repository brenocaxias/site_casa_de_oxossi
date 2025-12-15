'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export function BotaoVoltar() {
  const router = useRouter();

  return (
    <Button 
      variant="ghost" 
      onClick={() => router.back()} 
      className="gap-2 pl-0 hover:bg-transparent hover:text-primary transition-colors"
    >
      <ChevronLeft size={20} /> Voltar
    </Button>
  );
}