import { BookOpen, ArrowLeft } from 'lucide-react';

export default function DoutrinaHome() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 text-center space-y-6">
      <div className="bg-yellow-50 p-6 rounded-full">
        <BookOpen className="h-16 w-16 text-yellow-600" />
      </div>
      
      <div className="max-w-md space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">Biblioteca de Conhecimento</h1>
        <p className="text-slate-500">
          Selecione um Orixá, Entidade ou Fundamento no menu ao lado para ler sua história e itãs sagrados.
        </p>
      </div>

      <div className="md:hidden text-sm text-slate-400 animate-pulse flex items-center gap-2">
        <ArrowLeft size={16}/> Toque no menu acima
      </div>
    </div>
  );
}