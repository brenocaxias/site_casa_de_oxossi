'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'; // Certifique-se que este caminho está correto no seu projeto
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
import { Upload, Loader2, AlertCircle } from 'lucide-react';

export function UploadArquivo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const router = useRouter();

  // Configurações de Segurança
  const MAX_SIZE_MB = 10;
  // Definição dos tipos permitidos (MIME types)
  const ALLOWED_TYPES: Record<string, string[]> = {
    'doc': ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    'img': ['image/jpeg', 'image/png', 'image/webp'],
    'audio': ['audio/mpeg', 'audio/wav']
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    const formData = new FormData(e.currentTarget);
    const nome = formData.get('nome') as string;
    const tipo = formData.get('tipo') as string; // Vem como string do select
    const arquivo = formData.get('arquivo') as File;

    // 1. Validações de Segurança (Client-Side)
    if (!arquivo || arquivo.size === 0) {
        setErro("Selecione um arquivo válido.");
        setLoading(false);
        return;
    }

    // Valida se selecionou tipo
    if (!tipo || !ALLOWED_TYPES[tipo]) {
         setErro("Selecione uma categoria válida.");
         setLoading(false);
         return;
    }

    // Valida Tamanho
    if (arquivo.size > MAX_SIZE_MB * 1024 * 1024) {
        setErro(`O arquivo é muito grande. Máximo permitido: ${MAX_SIZE_MB}MB.`);
        setLoading(false);
        return;
    }

    // Valida Tipo (MIME Type)
    if (!ALLOWED_TYPES[tipo].includes(arquivo.type)) {
        setErro(`Tipo de arquivo inválido para a categoria selecionada. Enviado: ${arquivo.type}`);
        setLoading(false);
        return;
    }

    try {
        // 2. Prepara nome seguro (sanitização)
        const fileExt = arquivo.name.split('.').pop();
        const cleanName = nome.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/[^a-z0-9]/g, "-"); // Troca espaços/símbolos por traço
        
        const fileName = `${Date.now()}-${cleanName}.${fileExt}`;
        const filePath = `${tipo}/${fileName}`;

        // 3. Upload para o Storage
        const { error: uploadError } = await supabase.storage
            .from('arquivos')
            .upload(filePath, arquivo);

        if (uploadError) throw uploadError;

        // 4. Pegar URL pública
        const { data: { publicUrl } } = supabase.storage
            .from('arquivos')
            .getPublicUrl(filePath);

        // 5. Salvar referência no Banco
        // Ajuste 'arquivos_casa' para o nome exato da sua tabela no banco
        const { error: dbError } = await supabase
            .from('arquivos_casa') 
            .insert({
                nome: nome,
                tipo: tipo,
                url: publicUrl,
                tamanho: (arquivo.size / 1024 / 1024).toFixed(2) + ' MB'
            });

        if (dbError) throw dbError;

        setOpen(false);
        router.refresh();

    } catch (error: any) {
        console.error(error);
        setErro(error.message || "Erro ao fazer upload. Tente novamente.");
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
            
            {/* SOLUÇÃO DO ERRO: Trocamos Alert por uma DIV simples */}
            {erro && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center gap-3" role="alert">
                    <AlertCircle className="h-5 w-5" />
                    <span className="block sm:inline text-sm">{erro}</span>
                </div>
            )}

            <div className="grid gap-2">
                <Label htmlFor="nome">Nome do Material</Label>
                <Input id="nome" name="nome" placeholder="Ex: Apostila de Ervas" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="tipo">Categoria</Label>
                <Select name="tipo" required>
                    <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="doc">Documento (PDF)</SelectItem>
                        <SelectItem value="img">Imagem/Foto</SelectItem>
                        <SelectItem value="audio">Áudio (MP3)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="arquivo">Arquivo (Máx {MAX_SIZE_MB}MB)</Label>
                <Input 
                    id="arquivo" 
                    name="arquivo" 
                    type="file" 
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.mp3,.wav"
                    required 
                />
            </div>

            <DialogFooter>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? "Enviando..." : "Enviar Material"}
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}