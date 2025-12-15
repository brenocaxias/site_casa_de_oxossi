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
import { Loader2, CalendarCheck } from 'lucide-react';

// Aceita um texto personalizado para o botão (ex: "Agendar Agora")
export function AgendamentoPublico({ textoBotao = "Agendar Horário", variant = "default" }: { textoBotao?: string, variant?: "default" | "secondary" | "outline" }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Dados para salvar
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

  // Se deu certo, mostra mensagem de confirmação
  if (sucesso) {
     return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={variant} size="lg" className="w-full text-lg">{textoBotao}</Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-center sm:max-w-md">
                <div className="flex flex-col items-center gap-4 py-6">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <CalendarCheck size={24} />
                    </div>
                    <DialogTitle className="text-xl text-green-700">Pedido Enviado!</DialogTitle>
                    <DialogDescription>
                        Sua solicitação foi recebida com sucesso. <br/>
                        Entraremos em contato pelo WhatsApp para confirmar o horário.
                    </DialogDescription>
                    <Button onClick={() => { setOpen(false); setSucesso(false); }} className="mt-4 bg-green-600 hover:bg-green-700">
                        Entendido
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
     )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* O botão que aparece na Home */}
        <Button variant={variant} size="lg" className={variant === 'default' ? "text-lg px-8 py-6 h-auto shadow-lg shadow-primary/20 transition-transform hover:scale-105" : "w-full text-lg py-6"}>
            {textoBotao}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] bg-white text-slate-900 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Agendar Consulta</DialogTitle>
          <DialogDescription>
            Preencha seus dados. Entraremos em contato para confirmar.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            
            {/* Nome do Cliente */}
            <div className="grid gap-2">
                <Label htmlFor="nome">Seu Nome Completo</Label>
                <Input id="nome" name="nome" placeholder="Como gosta de ser chamado" required />
            </div>

            {/* WhatsApp */}
            <div className="grid gap-2">
                <Label htmlFor="contato">WhatsApp para Contato</Label>
                <Input id="contato" name="contato" placeholder="(XX) 9XXXX-XXXX" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Tipo de Jogo */}
                <div className="grid gap-2">
                    <Label htmlFor="tipo">Tipo de Jogo</Label>
                    <Select name="tipo" required>
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            <SelectItem value="buzios_completo">Jogo Completo (R$ 150)</SelectItem>
                            <SelectItem value="perguntas">Perguntas (R$ 80)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Data */}
                <div className="grid gap-2">
                    <Label htmlFor="data">Data Preferida</Label>
                    <Input id="data" name="data" type="datetime-local" required className="block" />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="notas">Dúvidas ou Observações (Opcional)</Label>
                <Textarea id="notas" name="notas" placeholder="Ex: Gostaria de saber sobre..." />
            </div>

            <DialogFooter>
                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-lg">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Solicitar Agendamento
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}