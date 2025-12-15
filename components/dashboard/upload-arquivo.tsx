'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
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
import { Upload, Loader2 } from 'lucide-react';

export function UploadArquivo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const nome = formData.get('nome') as string;
    const tipo = formData.get('tipo') as string;
    const arquivo = formData.get('arquivo') as File;

    if (!arquivo || arquivo.size === 0) {
        alert("Selecione um arquivo!");
        setLoading(false);
        return;
    }

    try {
        // 1. Upload do Arquivo Físico para o Storage
        const fileExt = arquivo.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${tipo}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('arquivos')
            .upload(filePath, arquivo);

        if (uploadError) throw uploadError;

        // 2. Pegar a URL pública
        const { data: { publicUrl } } = supabase.storage
            .from('arquivos')
            .getPublicUrl(filePath);

        // 3. Salvar os dados na Tabela
        const { error: dbError } = await supabase
            .from('arquivos_casa')
            .insert({
                nome: nome,
                tipo: tipo,
                url: publicUrl,
                tamanho: (arquivo.size / 1024 / 1024).toFixed(2) + ' MB' // Calcula tamanho em MB
            });

        if (dbError) throw dbError;

        setOpen(false);
        router.refresh();

    } catch (error: any) {
        alert('Erro no upload: ' + error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Upload size={16} /> Subir Arquivo
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Material</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleUpload} className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="nome">Nome do Material</Label>
                <Input id="nome" name="nome" placeholder="Ex: Apostila de Ervas" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="tipo">Tipo de Arquivo</Label>
                <Select name="tipo" required>
                    <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="doc">Documento (PDF/Word)</SelectItem>
                        <SelectItem value="img">Imagem/Foto</SelectItem>
                        <SelectItem value="audio">Áudio (MP3)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="arquivo">Arquivo</Label>
                <Input id="arquivo" name="arquivo" type="file" required />
            </div>

            <DialogFooter>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Enviar
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}