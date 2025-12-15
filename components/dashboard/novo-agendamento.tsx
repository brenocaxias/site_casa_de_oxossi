'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'; // Importe o do cliente (browser)
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
import { Loader2, Plus } from 'lucide-react';

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

    // Salvar no Supabase
    const { error } = await supabase
      .from('agendamentos')
      .insert({
        user_id: userId,
        tipo_jogo: tipo,
        data_agendamento: data, // O formato datetime-local já é compatível
        notas: notas,
        status: 'pendente'
      });

    setLoading(false);

    if (error) {
      alert('Erro ao agendar. Tente novamente.');
      console.error(error);
    } else {
      setOpen(false); // Fecha a janelinha
      router.refresh(); // Atualiza a página para aparecer o novo item
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus size={16} /> Novo Agendamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-slate-900 border-slate-200">
        <DialogHeader>
          <DialogTitle>Marcar Horário</DialogTitle>
          <DialogDescription>
            Escolha o tipo de jogo e a data de sua preferência. O Pai de Santo confirmará em breve.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            
            {/* Tipo de Jogo */}
            <div className="grid gap-2">
                <Label htmlFor="tipo">Tipo de Atendimento</Label>
                <Select name="tipo" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                        <SelectItem value="buzios_completo">Jogo de Búzios Completo (R$ 150)</SelectItem>
                        <SelectItem value="perguntas">Perguntas Objetivas (R$ 80)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Data */}
            <div className="grid gap-2">
                <Label htmlFor="data">Data e Hora Preferida</Label>
                <Input 
                    id="data" 
                    name="data" 
                    type="datetime-local" 
                    required 
                    className="block"
                />
            </div>

            {/* Observações */}
            <div className="grid gap-2">
                <Label htmlFor="notas">Observações (Opcional)</Label>
                <Textarea 
                    id="notas" 
                    name="notas" 
                    placeholder="Ex: É sobre saúde / Quero ver meus caminhos profissionais..." 
                />
            </div>

            <DialogFooter>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Confirmar Pedido
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}