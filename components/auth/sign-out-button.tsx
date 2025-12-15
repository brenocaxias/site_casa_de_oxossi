'use client';

import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login'); // Manda de volta pro login
    router.refresh(); // Limpa o estado da página
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
      <LogOut size={16} className="mr-2" />
      Sair
    </Button>
  );
}