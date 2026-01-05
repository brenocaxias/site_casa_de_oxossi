'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Check, X, Loader2, MessageCircle } from 'lucide-react'
import { atualizarStatusAgendamento } from '@/app/actions/atualizar-status-agendamento'

interface AcoesProps {
  id: number
  status: string
  telefone?: string
  nome?: string
  data?: string
}

export function AcoesAgendamento({ id, status, telefone, nome, data }: AcoesProps) {
  const [loading, setLoading] = useState(false)

  const handleStatus = async (novoStatus: 'confirmado' | 'cancelado') => {
    if (loading) return
    setLoading(true)

    try {
        // 1. Atualiza no Banco
        await atualizarStatusAgendamento(id, novoStatus)

        // 2. Se for confirmado, prepara o WhatsApp
        if (novoStatus === 'confirmado') {
            
            // Verifica se tem telefone
            if (!telefone) {
                alert("Agendamento confirmado! (Mas o cliente não cadastrou telefone para contato).")
                return
            }

            // Limpa o número (remove ( ) - e espaços)
            let numeroLimpo = telefone.replace(/\D/g, '')

            // Se o número for curto (ex: 11999999999 - 11 digitos), adiciona o 55 do Brasil
            if (numeroLimpo.length <= 11) {
                numeroLimpo = `55${numeroLimpo}`
            }

            // Cria a mensagem focada em PAGAMENTO/CONFIRMAÇÃO
            const texto = `Olá ${nome || 'Filho de Fé'}! 🕊️\n\nRecebemos sua solicitação de agendamento para *${data}*.\n\nPara confirmar seu horário, precisamos acertar os detalhes do pagamento.\n\nComo prefere prosseguir?`
            
            // Transforma o texto para URL
            const mensagemCodificada = encodeURIComponent(texto)
            const linkZap = `https://wa.me/${numeroLimpo}?text=${mensagemCodificada}`
            
            // Abre o WhatsApp
            window.open(linkZap, '_blank')
        }

    } catch (error) {
        console.error("Erro:", error)
        alert("Erro ao atualizar o status.")
    } finally {
        setLoading(false)
    }
  }

  if (status !== 'pendente') return null

  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        className="bg-green-600 hover:bg-green-700 text-white"
        onClick={() => handleStatus('confirmado')}
        disabled={loading}
        title="Aprovar e Ir para WhatsApp"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <div className="flex items-center gap-1"><Check className="h-4 w-4" /> <MessageCircle className="h-3 w-3" /></div>}
      </Button>
      
      <Button 
        size="sm" 
        variant="destructive"
        onClick={() => handleStatus('cancelado')}
        disabled={loading}
        title="Recusar Pedido"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
      </Button>
    </div>
  )
}