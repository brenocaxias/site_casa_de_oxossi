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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CalendarCheck, User, Smartphone, Sparkles, Clock, FileText, CalendarDays } from 'lucide-react';

interface AgendamentoProps {
    textoBotao?: string;
    variant?: "default" | "secondary" | "outline" | "ghost" | "link";
    className?: string;
    // NOVA PROPRIEDADE: Permite definir qual jogo já vem marcado
    jogoPreSelecionado?: "buzios_completo" | "perguntas";
}

export function AgendamentoPublico({ 
    textoBotao = "Agendar Horário", 
    variant = "default", 
    className,
    jogoPreSelecionado 
}: AgendamentoProps) {
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    const agendamento = {
        tipo_jogo: formData.get('tipo'),
        data_agendamento: formData.get('data'),
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
      setSucesso(true);
    }
  };

  if (sucesso) {
     return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={variant} className={className}>{textoBotao}</Button>
            </DialogTrigger>
            <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-center sm:max-w-md border border-slate-100 shadow-2xl rounded-2xl p-8 z-[100]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2 animate-in zoom-in duration-300">
                        <CalendarCheck size={32} />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-green-700">Pedido Recebido!</DialogTitle>
                    <DialogDescription className="text-slate-600 text-lg">
                        Sua solicitação foi enviada com sucesso. <br/>
                        <span className="font-medium text-slate-800">Entraremos em contato pelo WhatsApp</span> em breve para confirmar o horário.
                    </DialogDescription>
                    <Button onClick={() => { setOpen(false); setSucesso(false); }} className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-full h-12">
                        Entendido, Axé!
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
     )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className}>
            {textoBotao}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-[500px] bg-white text-slate-900 border border-slate-200 shadow-2xl rounded-xl z-[100]">
        <DialogHeader className="border-b pb-4 mb-4">
          <DialogTitle className="flex items-center gap-2 text-xl text-slate-800 font-bold">
             <CalendarDays className="h-6 w-6 text-yellow-600" /> Agendar Consulta
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Preencha seus dados abaixo. É rápido e seguro.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-2">
                <Label htmlFor="nome" className="text-slate-700 font-medium">Seu Nome</Label>
                <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input id="nome" name="nome" placeholder="Como gosta de ser chamado" required className="pl-10 bg-slate-50 border-slate-300 focus:border-yellow-500" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="contato" className="text-slate-700 font-medium">Seu WhatsApp</Label>
                <div className="relative">
                    <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input id="contato" name="contato" placeholder="(XX) 9XXXX-XXXX" required className="pl-10 bg-slate-50 border-slate-300 focus:border-yellow-500" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="tipo" className="text-slate-700 font-medium">Tipo de Jogo</Label>
                    <div className="relative">
                         <div className="absolute left-3 top-3 z-10 text-slate-400 pointer-events-none">
                            <Sparkles size={16} />
                         </div>
                        
                        {/* AQUI ESTÁ A MÁGICA: defaultValue */}
                        <Select name="tipo" required defaultValue={jogoPreSelecionado}>
                            <SelectTrigger className="pl-10 bg-slate-50 border-slate-300 focus:border-yellow-500 text-slate-700">
                                <SelectValue placeholder="Escolha..." />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-slate-200 z-[9999]">
                                <SelectItem value="buzios_completo">🐚 Búzios (R$ 150)</SelectItem>
                                <SelectItem value="perguntas">⭐ Perguntas (R$ 80)</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="data" className="text-slate-700 font-medium">Data Preferida</Label>
                    <div className="relative">
                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input id="data" name="data" type="datetime-local" required className="pl-10 bg-slate-50 border-slate-300 focus:border-yellow-500 text-slate-600 text-xs sm:text-sm" />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="notas" className="text-slate-700 font-medium">Observações (Opcional)</Label>
                <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Textarea id="notas" name="notas" placeholder="Ex: É sobre saúde, amor..." className="pl-10 min-h-[80px] bg-slate-50 border-slate-300 focus:border-yellow-500 resize-none" />
                </div>
            </div>

            <DialogFooter className="pt-4 border-t mt-4">
                <Button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-11 text-lg shadow-md">
                    {loading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</>
                    ) : (
                        'Solicitar Agendamento'
                    )}
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}