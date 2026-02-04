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
  data?: string // Esta data vem do banco de dados
}

export function AcoesAgendamento({ id, status, telefone, nome, data }: AcoesProps) {
  const [loading, setLoading] = useState(false)

  // Formata a data ISO do banco para o padrão brasileiro (DD/MM/AAAA HH:mm)
  const formatarDataBr = (dataIso?: string) => {
    if (!dataIso) return 'a combinar'
    try {
      const d = new Date(dataIso)
      return d.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'a combinar'
    }
  }

  const formatarWhatsapp = (num: string) => {
    let limpo = num.replace(/\D/g, '')
    if (limpo.length <= 11 && limpo.length > 0) {
      return `55${limpo}`
    }
    return limpo
  }

  const abrirWhatsapp = (numero: string, mensagem: string) => {
    const texto = encodeURIComponent(mensagem);
    
    // Protocolo whatsapp:// costuma forçar o celular a perguntar qual app usar (Pessoal ou Business)
    const urlApp = `whatsapp://send?phone=${numero}&text=${texto}`;
    const urlWeb = `https://wa.me/${numero}?text=${texto}`;

    // Tenta abrir o protocolo do app primeiro
    const lancar = window.open(urlApp, '_self');
    
    // Fallback caso o protocolo de app falhe ou não seja suportado
    setTimeout(() => {
        if (!lancar || lancar.closed) {
            window.open(urlWeb, '_blank');
        }
    }, 500);
  }

  const handleStatus = async (novoStatus: 'confirmado' | 'cancelado') => {
    if (loading) return
    setLoading(true)

    try {
      await atualizarStatusAgendamento(id, novoStatus)

      if (novoStatus === 'confirmado' && telefone) {
        const numeroLimpo = formatarWhatsapp(telefone)
        const dataLeitura = formatarDataBr(data)
        
        const mensagem = `Olá ${nome || 'Filho de Fé'}! 🕊️\n\nRecebemos sua solicitação de agendamento para o dia *${dataLeitura}*.\n\nPodemos confirmar este horário?`
        
        abrirWhatsapp(numeroLimpo, mensagem)
      }
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error)
      alert("Erro ao processar a solicitação.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {status === 'pendente' && (
        <>
          <Button 
            size="sm" 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => handleStatus('confirmado')}
            disabled={loading}
            title="Aprovar e avisar cliente"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          </Button>
          
          <Button 
            size="sm" 
            variant="destructive"
            onClick={() => handleStatus('cancelado')}
            disabled={loading}
            title="Recusar agendamento"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
          </Button>
        </>
      )}

      {telefone && (
        <Button 
          size="sm" 
          variant="outline"
          className="border-sky-500 text-sky-600 hover:bg-sky-50"
          onClick={() => {
            const numero = formatarWhatsapp(telefone)
            const dataLeitura = formatarDataBr(data)
            abrirWhatsapp(numero, `Olá! Gostaria de falar sobre seu agendamento de *${dataLeitura}*.`)
          }}
          title="Conversar manualmente"
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}