import Link from "next/link";
import { BookOpen, Heart } from "lucide-react";
import { Store } from "@/lib/types";

interface FooterProps {
  stores: Store[];
}

export default function Footer({ stores }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-[#E6DED3] bg-[#F3ECE1]/70 text-[#63574D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Columna 1: Misión */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#7A2633] text-[#FAF7F2] flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold text-[#211B17]">
                Librerías de Bolivia
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-[#63574D] max-w-md font-sans">
              Una iniciativa cultural independiente para centralizar y visibilizar la oferta 
              de libros en librerías y editoriales de toda Bolivia. Compara precios transparentes 
              en Bolivianos y compra directamente en tu librería favorita.
            </p>

            <p className="text-xs text-[#8E8276]">
              Los precios, inventario y disponibilidad son sincronizados directamente desde las plataformas oficiales de cada comercio.
            </p>
          </div>

          {/* Columna 2: Librerías Bolivianas */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#211B17] uppercase tracking-wider mb-4">
              Librerías Conectadas
            </h4>
            <ul className="space-y-1.5 text-xs">
              {stores.slice(0, 7).map((s) => (
                <li key={s.store_id}>
                  <a 
                    href={s.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#7A2633] hover:underline transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Editoriales */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#211B17] uppercase tracking-wider mb-4">
              Editoriales & Envíos
            </h4>
            <ul className="space-y-1.5 text-xs">
              {stores.slice(7).map((s) => (
                <li key={s.store_id}>
                  <a 
                    href={s.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#7A2633] hover:underline transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Barra inferior de copyright */}
        <div className="pt-6 border-t border-[#E6DED3] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E8276] gap-4">
          <p>© {new Date().getFullYear()} Librerías de Bolivia — Por amor a los libros y a los lectores.</p>
          <div className="flex items-center space-x-1 text-xs">
            <span>Hecho para fomentar la lectura en Bolivia</span>
            <Heart className="w-3.5 h-3.5 text-[#7A2633] fill-current" />
          </div>
        </div>

      </div>
    </footer>
  );
}
