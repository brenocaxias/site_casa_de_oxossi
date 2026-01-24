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
import { Loader2, CalendarCheck, User, Smartphone, Clock, FileText, CalendarDays, MessageCircle } from 'lucide-react'; // Adicionei MessageCircle

interface AgendamentoProps {
    textoBotao?: string;
    variant?: "default" | "secondary" | "outline" | "ghost" | "link";
    className?: string;
    jogoPreSelecionado?: "buzios_completo" | "perguntas";
}

export function AgendamentoPublico({ 
    textoBotao = "Agendar Horário", 
    variant = "default", 
    className,
}: AgendamentoProps) {
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  
  // Estado para guardar o link gerado caso o popup falhe
  const [linkWhatsapp, setLinkWhatsapp] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const dataInput = formData.get('data') as string;
    const nome = formData.get('nome') as string;
    
    const agendamento = {
        tipo_jogo: 'buzios_completo',
        data_agendamento: dataInput,
        cliente_nome: nome,
        cliente_contato: formData.get('contato'),
        notas: formData.get('notas'),
        status: 'pendente'
    };

    // 1. Salva no banco (Backup)
    const { error } = await supabase.from('agendamentos').insert(agendamento);

    setLoading(false);

    if (error) {
      alert('Erro ao agendar. Tente novamente.');
      console.error(error);
    } else {
      // 2. Prepara o link do WhatsApp
      // SUBSTITUA PELO SEU NÚMERO (COM 55 E DDD)
      const numeroPaiDeSanto = "5521999999999"; 
      
      const dataFormatada = new Date(dataInput).toLocaleString('pt-BR', { 
          day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' 
      });

      const mensagem = `Olá! Acabei de fazer um agendamento no site e gostaria de confirmar.\n\n👤 *Nome:* ${nome}\n📅 *Data:* ${dataFormatada}\n🔮 *Tipo:* Jogo de Búzios\n\nFico no aguardo!`;
      
      const link = `https://wa.me/${5521969690953}?text=${encodeURIComponent(mensagem)}`;
      setLinkWhatsapp(link);

      // 3. Tenta abrir automaticamente
      // Nota: Alguns navegadores bloqueiam se não for clique direto, por isso mantemos o botão no dialog de sucesso
      window.open(link, '_blank');

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
                        <MessageCircle size={32} />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-green-700">Quase lá!</DialogTitle>
                    <DialogDescription className="text-slate-600 text-lg">
                        Seu pré-agendamento foi salvo. <br/>
                        Para garantir o horário, <strong>confirme a mensagem no WhatsApp</strong> que acabamos de abrir.
                    </DialogDescription>
                    
                    {/* Botão caso o popup tenha sido bloqueado */}
                    <Button 
                        onClick={() => window.open(linkWhatsapp, '_blank')} 
                        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-full h-12 flex items-center justify-center gap-2"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Confirmar no WhatsApp
                    </Button>

                    <Button variant="ghost" onClick={() => { setOpen(false); setSucesso(false); }} className="mt-2 text-slate-400 hover:text-slate-600">
                        Fechar
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
      
      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:max-w-[500px] bg-white text-slate-900 border border-slate-200 shadow-2xl rounded-xl z-[100] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4 mb-4">
          <DialogTitle className="flex items-center gap-2 text-xl text-slate-800 font-bold">
             <CalendarDays className="h-6 w-6 text-yellow-600" /> Agendar Jogo de Búzios
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Preencha seus dados para solicitar o agendamento. A confirmação será feita via WhatsApp.
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

            <div className="space-y-2">
                <Label htmlFor="data" className="text-slate-700 font-medium">Data e Hora Preferida</Label>
                <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                        id="data" 
                        name="data" 
                        type="datetime-local" 
                        required 
                        className="pl-10 bg-slate-50 border-slate-300 focus:border-yellow-500 text-slate-600 w-full" 
                    />
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
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando...</>
                    ) : (
                        'Agendar e Confirmar no Zap'
                    )}
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}