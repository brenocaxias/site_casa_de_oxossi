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
import { supabase } from '@/lib/supabase';
import { Sparkles, Loader2, Save } from 'lucide-react';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

export function AtualizarOdu({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: ''
  });

  const handleSave = async () => {
    if (!formData.conteudo) {
      toast.error("Escreva a mensagem do Odu.");
      return;
    }

    setLoading(true);

    try {
        // Insere o novo Odu
        const { error } = await supabase.from('odus').insert({
            user_id: userId,
            titulo: formData.titulo || 'Mensagem da Semana',
            conteudo: formData.conteudo
        });

        if (error) throw error;

        toast.success("Odu da semana atualizado!");
        setOpen(false);
        setFormData({ titulo: '', conteudo: '' });
        router.refresh();

    } catch (error: any) {
        toast.error("Erro: " + error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-secondary hover:bg-amber-400 text-secondary-foreground font-bold gap-2 shadow-sm">
            <Sparkles size={16} /> Publicar Odu da Semana
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2">
             <Sparkles size={20} className="text-secondary" /> Novo Odu da Semana
          </DialogTitle>
          <DialogDescription>
            Essa mensagem aparecerá na página inicial para todos os visitantes.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="titulo">Título (Opcional)</Label>
            <Input 
                id="titulo" 
                value={formData.titulo} 
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                placeholder="Ex: Odu Obará - Prosperidade"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="conteudo">Mensagem / Conselho</Label>
            <Textarea 
                id="conteudo" 
                value={formData.conteudo} 
                onChange={(e) => setFormData({...formData, conteudo: e.target.value})}
                placeholder="Escreva aqui o conselho da semana..."
                className="min-h-[150px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} disabled={loading} className="bg-primary text-white font-bold">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Publicar no Site
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}