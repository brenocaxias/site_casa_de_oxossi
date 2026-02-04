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

  // Formata a data para o padrão brasileiro
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

  // Limpa e formata o número para o padrão internacional
  const formatarWhatsapp = (num: string) => {
    let limpo = num.replace(/\D/g, '')
    if (limpo.length <= 11 && limpo.length > 0) {
      return `55${limpo}`
    }
    return limpo
  }

  const abrirWhatsapp = (numero: string, mensagem: string) => {
    const texto = encodeURIComponent(mensagem);
    
    // A API oficial (api.whatsapp.com) é mais reconhecida por disparar o seletor de apps
    const urlApi = `https://api.whatsapp.com/send?phone=${numero}&text=${texto}`;
    
    // Tentativa com protocolo direto para tentar "pular" o navegador se possível
    const urlProtocolo = `whatsapp://send?phone=${numero}&text=${texto}`;

    // No mobile, tentamos o protocolo direto primeiro
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = urlProtocolo;
      
      // Se em 1 segundo ainda estiver na página, abre a API oficial como fallback
      setTimeout(() => {
        if (document.hasFocus()) {
          window.open(urlApi, '_blank');
        }
      }, 1000);
    } else {
      // No Desktop, abre a API oficial direto
      window.open(urlApi, '_blank');
    }
  }

  const handleStatus = async (novoStatus: 'confirmado' | 'cancelado') => {
    if (loading) return
    setLoading(true)

    try {
      await atualizarStatusAgendamento(id, novoStatus)

      if (novoStatus === 'confirmado' && telefone) {
        const numeroLimpo = formatarWhatsapp(telefone)
        const dataLeitura = formatarDataBr(data)
        
        const mensagem = `Olá ${nome || 'Filho de Fé'}! 🕊️\n\nConfirmamos seu agendamento para o dia *${dataLeitura}*.\n\nPodemos prosseguir?`
        
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
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          </Button>
          
          <Button 
            size="sm" 
            variant="destructive"
            onClick={() => handleStatus('cancelado')}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
          </Button>
        </>
      )}

      {telefone && (
        <Button 
          size="sm" 
          variant="outline"
          className="border-sky-500 text-sky-600"
          onClick={() => {
            const numero = formatarWhatsapp(telefone)
            const dataLeitura = formatarDataBr(data)
            abrirWhatsapp(numero, `Olá! Axé. Gostaria de falar sobre o agendamento de *${dataLeitura}*.`)
          }}
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}