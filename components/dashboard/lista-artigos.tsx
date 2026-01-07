"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { EditarArtigo } from "./editar-artigo";

export function ListaArtigos({ artigos }: { artigos: any[] }) {
  if (!artigos || artigos.length === 0) return null;

  return (
    <Card className="mt-8 border-purple-200 bg-purple-50/30">
        <CardHeader>
            <CardTitle className="text-purple-900 flex items-center gap-2">
                <BookOpen className="h-5 w-5"/> Histórico de Publicações
            </CardTitle>
            <CardDescription>Gerencie as histórias que aparecem na Doutrina.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                {artigos.map((artigo) => (
                    <div key={artigo.id} className="flex items-center justify-between p-3 bg-white rounded-lg border shadow-sm">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <Badge variant="outline" className="uppercase text-[10px] min-w-[70px] justify-center">
                                {artigo.categoria}
                            </Badge>
                            <span className="font-medium text-slate-700 truncate">{artigo.titulo}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 hidden md:block">
                                {new Date(artigo.created_at).toLocaleDateString()}
                            </span>
                            <EditarArtigo artigo={artigo} />
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
  );
}