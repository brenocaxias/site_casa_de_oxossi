'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { PenTool, Loader2, Save } from 'lucide-react';
// MUDANÇA: Importamos 'toast' direto da biblioteca sonner
import { toast } from "sonner";

export function NovoArtigo({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: '',
    categoria: 'orixas',
    imagem_url: ''
  });

  const handleSave = async () => {
    if (!formData.titulo || !formData.conteudo) {
      // MUDANÇA: Sintaxe do Sonner é mais simples
      toast.error("Preencha título e conteúdo.");
      return;
    }

    setLoading(true);

    try {
        const slug = formData.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const { error } = await supabase.from('artigos').insert({
            user_id: userId,
            titulo: formData.titulo,
            conteudo: formData.conteudo,
            categoria: formData.categoria,
            imagem_url: formData.imagem_url,
            slug: slug
        });

        if (error) throw error;

        // MUDANÇA: Sintaxe do Sonner
        toast.success("Sucesso! Artigo publicado na biblioteca.");
        
        setOpen(false);
        setFormData({ titulo: '', conteudo: '', categoria: 'orixas', imagem_url: '' });
        router.refresh();

    } catch (error: any) {
        toast.error("Erro ao salvar: " + error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-sky-600 text-white font-bold gap-2 shadow-sm">
            <PenTool size={16} /> Escrever História
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2">
             <PenTool size={20} /> Novo Conteúdo para Biblioteca
          </DialogTitle>
          <DialogDescription>
            Adicione histórias, itãs ou fundamentos para os filhos da casa.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="titulo">Título do Artigo</Label>
            <Input 
                id="titulo" 
                value={formData.titulo} 
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                placeholder="Ex: A Lenda de Oxóssi Caçador"
                className="font-bold text-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Select 
                    value={formData.categoria} 
                    onValueChange={(val) => setFormData({...formData, categoria: val})}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="orixas">Orixás</SelectItem>
                        <SelectItem value="fundamentos">Fundamentos</SelectItem>
                        <SelectItem value="historia">História da Casa</SelectItem>
                        <SelectItem value="avisos">Avisos</SelectItem>
                    </SelectContent>
                </Select>
             </div>
             
             <div className="grid gap-2">
                <Label htmlFor="img">URL da Imagem (Capa)</Label>
                <Input 
                    id="img" 
                    value={formData.imagem_url} 
                    onChange={(e) => setFormData({...formData, imagem_url: e.target.value})}
                    placeholder="https://..."
                />
             </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="conteudo">Conteúdo (Texto)</Label>
            <Textarea 
                id="conteudo" 
                value={formData.conteudo} 
                onChange={(e) => setFormData({...formData, conteudo: e.target.value})}
                placeholder="Escreva aqui o conhecimento..."
                className="min-h-[200px]"
            />
            <p className="text-xs text-muted-foreground">
                Dica: Você pode usar tags HTML simples como &lt;b&gt;, &lt;p&gt; se souber.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-sky-600 text-white font-bold">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Publicar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}