"use client"

import { useState } from "react";
// CORREÇÃO: Importamos o cliente que você já tem configurado no projeto
import { supabase } from "@/lib/supabase"; 
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
import { PenTool, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function NovoArtigo({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // O 'supabase' já vem importado lá em cima, não precisamos criar ele aqui.

  // Estados do formulário
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [categoria, setCategoria] = useState("orixa"); 
  const [imagemUrl, setImagemUrl] = useState("");

  const gerarSlug = (texto: string) => {
    return texto
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^a-z0-9]+/g, "-") 
      .replace(/^-+|-+$/g, ""); 
  };

  const handleSalvar = async () => {
    if (!titulo || !conteudo) {
      alert("Título e Conteúdo são obrigatórios!");
      return;
    }

    setLoading(true);

    const slug = gerarSlug(titulo);

    try {
      const { error } = await supabase.from("artigos").insert({
        titulo,
        slug,
        conteudo,
        categoria,
        imagem_url: imagemUrl,
        autor_id: userId,
        publicado: true
      });

      if (error) {
        if (error.code === "23505") { 
            alert("Já existe uma história com este nome. Tente mudar um pouco o título.");
        } else {
            console.error(error);
            alert("Erro ao salvar. Verifique se você é Admin.");
        }
        return;
      }

      setOpen(false);
      setTitulo("");
      setConteudo("");
      setImagemUrl("");
      router.refresh(); 
      alert("História publicada com sucesso na Biblioteca!");

    } catch (err) {
      console.error(err);
      alert("Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
          <PenTool size={18} />
          Escrever História
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar à Biblioteca</DialogTitle>
          <DialogDescription>
            Escreva a história ou fundamento. Ela aparecerá na página pública "Doutrina".
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          
          <div className="grid gap-2">
            <Label htmlFor="titulo">Título da História</Label>
            <Input 
              id="titulo" 
              placeholder="Ex: A Lenda de Oxóssi Caçador" 
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="categoria">Onde deve aparecer?</Label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="orixa">Orixás</SelectItem>
                <SelectItem value="entidade">Entidades / Guias</SelectItem>
                <SelectItem value="fundamento">Fundamentos da Casa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="img">Link da Imagem (Opcional)</Label>
            <Input 
              id="img" 
              placeholder="https://..." 
              value={imagemUrl}
              onChange={(e) => setImagemUrl(e.target.value)}
            />
            <p className="text-xs text-slate-500">
                Dica: Copie o endereço da imagem que você subiu na aba "Arquivos da Casa".
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="conteudo">Texto Completo</Label>
            <Textarea 
              id="conteudo" 
              placeholder="Digite aqui toda a história, itã ou explicação..." 
              className="min-h-[200px]"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
            />
          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSalvar} disabled={loading} className="bg-green-600 hover:bg-green-700">
            {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2"/> : null}
            Publicar Agora
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}