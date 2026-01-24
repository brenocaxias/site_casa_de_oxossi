'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/lib/supabase';
import { Calendar, Loader2, CheckCircle2 } from 'lucide-react';
// MUDANÇA: Usando o Sonner (novo sistema de toast)
import { toast } from "sonner";

interface AgendamentoPublicoProps {
  className?: string;
  textoBotao?: string;
  jogoPreSelecionado?: string;
}

export function AgendamentoPublico({ 
    className, 
    textoBotao = "Agendar Consulta", 
    jogoPreSelecionado = "" 
}: AgendamentoPublicoProps) {
    
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    contato: '',
    tipo_jogo: jogoPreSelecionado,
    data_preferencia: '',
    notas: ''
  });

  const handleAgendar = async () => {
    // Validação básica
    if (!formData.nome || !formData.contato || !formData.tipo_jogo) {
      toast.error("Por favor, preencha nome, contato e tipo de jogo.");
      return;
    }

    setLoading(true);

    try {
        const { error } = await supabase.from('agendamentos').insert({
            // Como é público, não enviamos user_id (será nulo ou tratado no backend)
            cliente_nome: formData.nome,
            cliente_contato: formData.contato,
            tipo_jogo: formData.tipo_jogo,
            data_agendamento: formData.data_preferencia ? new Date(formData.data_preferencia).toISOString() : null,
            notas: formData.notas,
            status: 'pendente'
        });

        if (error) throw error;

        setSucesso(true);
        toast.success("Solicitação enviada com sucesso!");

    } catch (error: any) {
        console.error(error);
        toast.error("Erro ao agendar. Tente novamente ou chame no WhatsApp.");
    } finally {
        setLoading(false);
    }
  };

  const resetForm = () => {
      setSucesso(false);
      setFormData({
        nome: '',
        contato: '',
        tipo_jogo: jogoPreSelecionado,
        data_preferencia: '',
        notas: ''
      });
      setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen && sucesso) resetForm(); // Reseta ao fechar se tiver finalizado
        setOpen(isOpen);
    }}>
      <DialogTrigger asChild>
        <Button className={className}>
            {textoBotao}
        </Button>
      </DialogTrigger>
      
      {/* MUDANÇA CRÍTICA PARA MOBILE:
         - max-h-[90vh]: Altura máxima de 90% da tela
         - overflow-y-auto: Permite rolar se não couber
         - w-[95%]: Largura quase total no celular
         - rounded-xl: Bordas mais arredondadas
      */}
      <DialogContent className="max-h-[90vh] overflow-y-auto w-[95%] sm:max-w-md rounded-xl p-4 sm:p-6">
        
        {sucesso ? (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 size={40} />
                </div>
                <DialogTitle className="text-2xl font-bold text-green-700">Pedido Recebido!</DialogTitle>
                <p className="text-muted-foreground">
                    Sua solicitação foi enviada para a secretaria da casa. 
                    <br/>Em breve entraremos em contato pelo número informado para confirmar o horário.
                </p>
                <Button onClick={resetForm} className="mt-4 bg-green-600 hover:bg-green-700 text-white w-full font-bold">
                    Entendido, Axé!
                </Button>
            </div>
        ) : (
            <>
                <DialogHeader className="mb-2">
                <DialogTitle className="text-primary flex items-center gap-2 text-xl">
                    <Calendar className="w-5 h-5" /> Agendar Atendimento
                </DialogTitle>
                <DialogDescription>
                    Preencha seus dados. Entraremos em contato para confirmar o horário.
                </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                    
                    {/* Nome */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="nome" className="text-foreground font-semibold">Seu Nome Completo</Label>
                        <Input 
                            id="nome" 
                            placeholder="Ex: Maria da Silva" 
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                            className="bg-slate-50 border-slate-200 focus:border-primary"
                        />
                    </div>

                    {/* Contato e Tipo (Lado a Lado no Desktop, Um abaixo do outro no Mobile) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="grid gap-1.5">
                            <Label htmlFor="contato" className="text-foreground font-semibold">WhatsApp / Telefone</Label>
                            <Input 
                                id="contato" 
                                placeholder="(21) 99999-9999" 
                                value={formData.contato}
                                onChange={(e) => setFormData({...formData, contato: e.target.value})}
                                type="tel"
                                className="bg-slate-50 border-slate-200 focus:border-primary"
                            />
                        </div>

                        <div className="grid gap-1.5">
                            <Label htmlFor="jogo" className="text-foreground font-semibold">Tipo de Consulta</Label>
                            <Select 
                                value={formData.tipo_jogo} 
                                onValueChange={(val) => setFormData({...formData, tipo_jogo: val})}
                            >
                                <SelectTrigger className="bg-slate-50 border-slate-200">
                                    <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="buzios_completo">Jogo de Búzios</SelectItem>
                                    <SelectItem value="consulta_espiritual">Consulta Espiritual</SelectItem>
                                    <SelectItem value="trabalho">Ebó / Trabalho</SelectItem>
                                    <SelectItem value="limpeza">Limpeza</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Data */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="data" className="text-foreground font-semibold">Preferência de Data/Horário</Label>
                        <Input 
                            id="data" 
                            type="datetime-local"
                            value={formData.data_preferencia}
                            onChange={(e) => setFormData({...formData, data_preferencia: e.target.value})}
                            className="bg-slate-50 border-slate-200 focus:border-primary"
                        />
                    </div>

                    {/* Notas */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="notas" className="text-muted-foreground">Observações (Opcional)</Label>
                        <Textarea 
                            id="notas" 
                            placeholder="Gostaria de focar em saúde, amor, ou tem alguma dúvida específica?"
                            value={formData.notas}
                            onChange={(e) => setFormData({...formData, notas: e.target.value})}
                            className="resize-none bg-slate-50 border-slate-200 focus:border-primary min-h-[80px]"
                        />
                    </div>
                </div>

                <DialogFooter className="mt-4 gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">
                        Cancelar
                    </Button>
                    <Button onClick={handleAgendar} disabled={loading} className="w-full sm:w-auto bg-primary hover:bg-sky-600 text-white font-bold">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Solicitar Agendamento
                    </Button>
                </DialogFooter>
            </>
        )}
      </DialogContent>
    </Dialog>
  );
}