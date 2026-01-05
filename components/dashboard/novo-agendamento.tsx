'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, CalendarPlus, Clock, FileText, User, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NovoAgendamentoProps {
    userId: string;
}

export function NovoAgendamento({ userId }: NovoAgendamentoProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    const agendamento = {
        user_id: userId,
        tipo_jogo: 'buzios_completo',
        data_agendamento: formData.get('data'),
        // CORREÇÃO: Agora salvamos explicitamente o nome e o zap no agendamento
        cliente_nome: formData.get('nome'), 
        cliente_contato: formData.get('contato'),
        notas: formData.get('notas'),
        status: 'pendente'
    };

    const { error } = await supabase.from('agendamentos').insert(agendamento);

    setLoading(false);

    if (error) {
      alert('Erro ao agendar. Tente novamente.');
      console.error(error);
    } else {
      setOpen(false);
      router.refresh(); 
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
            <CalendarPlus size={16} /> Novo Pedido
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] bg-white text-slate-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
             <CalendarPlus className="h-5 w-5 text-primary" /> Solicitar Jogo de Búzios
          </DialogTitle>
          <DialogDescription>
            Preencha seus dados para confirmar o pedido.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
            
            {/* CAMPO NOME */}
            <div className="space-y-2">
                <Label htmlFor="nome" className="text-right">Seu Nome</Label>
                <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                        id="nome" 
                        name="nome" 
                        placeholder="Como deseja ser chamado" 
                        required 
                        className="pl-10" 
                    />
                </div>
            </div>

            {/* CAMPO WHATSAPP */}
            <div className="space-y-2">
                <Label htmlFor="contato" className="text-right">Seu WhatsApp</Label>
                <div className="relative">
                    <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                        id="contato" 
                        name="contato" 
                        placeholder="(XX) 9XXXX-XXXX" 
                        required 
                        className="pl-10" 
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="data" className="text-right">Data e Hora Preferida</Label>
                <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                        id="data" 
                        name="data" 
                        type="datetime-local" 
                        required 
                        className="pl-10" 
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="notas" className="text-right">Observações (Opcional)</Label>
                <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Textarea 
                        id="notas" 
                        name="notas" 
                        placeholder="Ex: É urgente, prefiro à tarde..." 
                        className="pl-10 resize-none" 
                    />
                </div>
            </div>

            <DialogFooter>
                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Confirmar Pedido'}
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}