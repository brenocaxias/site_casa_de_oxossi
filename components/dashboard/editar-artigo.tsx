"use client"

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function EditarArtigo({ artigo }: { artigo: any }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [titulo, setTitulo] = useState(artigo.titulo);
  const [conteudo, setConteudo] = useState(artigo.conteudo);
  const [categoria, setCategoria] = useState(artigo.categoria);
  const [imagemUrl, setImagemUrl] = useState(artigo.imagem_url || "");

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("artigos")
        .update({
          titulo,
          conteudo,
          categoria,
          imagem_url: imagemUrl,
          updated_at: new Date().toISOString()
        })
        .eq("id", artigo.id);

      if (error) throw error;

      setOpen(false);
      router.refresh();
      alert("História atualizada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja apagar esta história? Não tem volta.")) return;
    
    setLoading(true);
    try {
        const { error } = await supabase.from("artigos").delete().eq("id", artigo.id);
        if (error) throw error;
        
        setOpen(false);
        router.refresh();
    } catch (err) {
        console.error(err);
        alert("Erro ao apagar.");
    } finally {
        setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Pencil className="h-4 w-4 text-slate-500 hover:text-blue-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar História</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Título</Label>
            <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label>Categoria</Label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="orixa">Orixás</SelectItem>
                <SelectItem value="entidade">Entidades / Guias</SelectItem>
                <SelectItem value="fundamento">Fundamentos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Imagem (URL)</Label>
            <Input value={imagemUrl} onChange={(e) => setImagemUrl(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label>Texto</Label>
            <Textarea 
              value={conteudo} 
              onChange={(e) => setConteudo(e.target.value)} 
              className="min-h-[200px]"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
           <Button variant="destructive" onClick={handleDelete} type="button">
                <Trash2 className="h-4 w-4 mr-2"/> Apagar História
           </Button>
           
           <div className="flex gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button onClick={handleUpdate} disabled={loading} className="bg-blue-600">
                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2"/>} Salvar
                </Button>
           </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}