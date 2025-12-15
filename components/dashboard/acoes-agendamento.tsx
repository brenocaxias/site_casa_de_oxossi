'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Check, X, Trash2, Loader2 } from 'lucide-react';

interface AcoesProps {
    id: string;
    status: string;
}

export function AcoesAgendamento({ id, status }: AcoesProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Função para mudar o status (Confirmar ou Cancelar)
    const atualizarStatus = async (novoStatus: string) => {
        setLoading(true);
        await supabase
            .from('agendamentos')
            .update({ status: novoStatus })
            .eq('id', id);
        
        setLoading(false);
        router.refresh(); // Atualiza a tela sem recarregar
    };

    // Função para excluir o agendamento
    const excluirAgendamento = async () => {
        const confirmar = window.confirm("Tem certeza que deseja apagar este agendamento?");
        if (!confirmar) return;

        setLoading(true);
        await supabase
            .from('agendamentos')
            .delete()
            .eq('id', id);

        setLoading(false);
        router.refresh();
    };

    if (loading) {
        return <Loader2 className="h-5 w-5 animate-spin text-slate-400" />;
    }

    return (
        <div className="flex items-center gap-2">
            {/* Se estiver Pendente, mostra botões de Aceitar/Recusar */}
            {status === 'pendente' && (
                <>
                    <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white h-8 w-8 p-0 rounded-full"
                        title="Confirmar Agendamento"
                        onClick={() => atualizarStatus('confirmado')}
                    >
                        <Check size={16} />
                    </Button>

                    <Button 
                        size="sm" 
                        className="bg-red-500 hover:bg-red-600 text-white h-8 w-8 p-0 rounded-full"
                        title="Recusar/Cancelar"
                        onClick={() => atualizarStatus('cancelado')}
                    >
                        <X size={16} />
                    </Button>
                </>
            )}

            {/* Botão de Excluir (Lixeira) - Sempre visível */}
            <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0 rounded-full"
                title="Excluir do Histórico"
                onClick={excluirAgendamento}
            >
                <Trash2 size={16} />
            </Button>
        </div>
    );
}