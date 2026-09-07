"use client";

import { useState, useEffect, FormEvent } from "react";
import { Search, X, Loader2, Sparkles, BookOpen } from "lucide-react";

interface HeroSearchProps {
  initialQuery?: string;
  onSearch: (q: string) => void;
  isLoading?: boolean;
}

const POPULAR_SEARCHES = [
  "El dictador elegido",
  "Gabriel García Márquez",
  "Edmundo Paz Soldán",
  "Liliana Colanzi",
  "Plural Editores",
  "La Casa De Los Espíritus",
  "Maus",
  "Ficciones"
];

export default function HeroSearch({
  initialQuery = "",
  onSearch,
  isLoading = false
}: HeroSearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  const handleQuickChip = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <section className="relative pt-12 pb-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      
      {/* Insignia superior editorial */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE1] border border-[#E6DED3] text-xs font-serif font-medium text-[#7A2633] mb-6 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-[#BD7B31]" />
        <span>Comparador Cultural & Editorial de Bolivia</span>
      </div>

      {/* Titular literario */}
      <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#211B17] mb-5 leading-[1.15]">
        Encuentra cualquier libro en las <br className="hidden sm:inline" />
        <span className="italic font-normal text-[#7A2633] underline decoration-[#BD7B31]/40 decoration-wavy decoration-1 underline-offset-8">
          librerías de Bolivia
        </span>
      </h1>

      {/* Subtítulo */}
      <p className="text-base sm:text-lg text-[#63574D] max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
        Consulta disponibilidad en tiempo real, compara precios en Bolivianos (BOB) 
        y apoya a las editoriales y librerías de todo el país.
      </p>

      {/* Cajón de Búsqueda Fichero de Biblioteca */}
      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <div className="relative flex items-center rounded-2xl bg-[#FFFFFF] shadow-lg border-2 border-[#E6DED3] focus-within:border-[#BD7B31] focus-within:ring-4 focus-within:ring-[#BD7B31]/10 transition-all">
          
          <div className="pl-5 text-[#BD7B31]">
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin text-[#BD7B31]" />
            ) : (
              <Search className="w-6 h-6 stroke-[2]" />
            )}
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Título, autor, editorial o ISBN (ej. 'El dictador elegido', 'Borges')..."
            className="w-full py-4 pl-4 pr-12 text-base sm:text-lg text-[#211B17] placeholder-[#8E8276] bg-transparent focus:outline-none font-sans"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-24 p-1.5 text-[#8E8276] hover:text-[#211B17] transition-colors"
              title="Borrar búsqueda"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <button
            type="submit"
            className="mr-2 px-5 py-2.5 rounded-xl bg-[#7A2633] hover:bg-[#651D28] text-[#FAF7F2] font-medium text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7A2633]/50"
          >
            Buscar
          </button>

        </div>
      </form>

      {/* Sugerencias Rápidas / Fichas Populares */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-[#63574D]">
        <span className="font-serif italic font-medium mr-1 text-[#8E8276]">Búsquedas sugeridas:</span>
        {POPULAR_SEARCHES.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => handleQuickChip(term)}
            className="px-2.5 py-1 rounded-lg bg-[#F3ECE1] hover:bg-[#E6DED3] text-[#63574D] hover:text-[#211B17] border border-[#E6DED3] transition-colors"
          >
            {term}
          </button>
        ))}
      </div>

    </section>
  );
}
