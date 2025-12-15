'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Loader2, Plus, CalendarDays, Sparkles, FileText, Clock } from 'lucide-react';

export function NovoAgendamento({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const tipo = formData.get('tipo') as string;
    const data = formData.get('data') as string;
    const notas = formData.get('notas') as string;

    const { error } = await supabase
      .from('agendamentos')
      .insert({
        user_id: userId,
        tipo_jogo: tipo,
        data_agendamento: data,
        notas: notas,
        status: 'pendente'
      });

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
        <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-sm transition-all hover:scale-105 font-bold text-white">
            <Plus size={18} /> Novo Agendamento
        </Button>
      </DialogTrigger>
      
      {/* ADICIONEI: 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' para CENTRALIZAR */}
      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-[500px] bg-white border border-slate-200 shadow-2xl rounded-xl z-[100]">
        
        <DialogHeader className="border-b pb-4 mb-4">
          <DialogTitle className="flex items-center gap-2 text-xl text-primary font-bold">
            <CalendarDays className="h-6 w-6" /> Marcar Horário
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Escolha o oráculo e a data de preferência. O Pai de Santo confirmará em breve.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Tipo de Jogo */}
            <div className="space-y-2">
                <Label htmlFor="tipo" className="text-slate-700 font-medium">Tipo de Atendimento</Label>
                <div className="relative">
                    <div className="absolute left-3 top-2.5 z-10 text-slate-400 pointer-events-none">
                        <Sparkles size={18} />
                    </div>
                    <Select name="tipo" required>
                        <SelectTrigger className="w-full pl-10 h-10 bg-slate-50 border-slate-300 focus:border-primary focus:ring-primary/20 text-slate-800">
                            <SelectValue placeholder="Selecione o jogo..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-slate-200 shadow-lg z-[9999]">
                            <SelectItem value="buzios_completo" className="cursor-pointer hover:bg-slate-100 py-3 font-medium">
                                🐚 Jogo de Búzios Completo (R$ 150)
                            </SelectItem>
                            <SelectItem value="perguntas" className="cursor-pointer hover:bg-slate-100 py-3 font-medium">
                                ⭐ Perguntas Objetivas (R$ 80)
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Data e Hora */}
            <div className="space-y-2">
                <Label htmlFor="data" className="text-slate-700 font-medium">Data e Hora Preferida</Label>
                <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                        id="data" 
                        name="data" 
                        type="datetime-local" 
                        required 
                        className="pl-10 h-10 bg-slate-50 border-slate-300 focus:border-primary focus:ring-primary/20 text-slate-700 w-full block"
                    />
                </div>
            </div>

            {/* Observações */}
            <div className="space-y-2">
                <Label htmlFor="notas" className="text-slate-700 font-medium">Observações (Opcional)</Label>
                <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Textarea 
                        id="notas" 
                        name="notas" 
                        placeholder="Ex: Gostaria de ver sobre saúde e caminhos profissionais..." 
                        className="pl-10 min-h-[100px] bg-slate-50 border-slate-300 focus:border-primary focus:ring-primary/20 resize-none text-slate-700"
                    />
                </div>
            </div>

            <DialogFooter className="pt-4 border-t mt-6 flex flex-col sm:flex-row gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="sm:mr-auto w-full sm:w-auto">
                    Cancelar
                </Button>
                <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-white font-bold w-full sm:w-auto shadow-md">
                    {loading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Agendando...</>
                    ) : (
                        'Confirmar Pedido'
                    )}
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}