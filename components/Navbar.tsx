"use client";

import Link from "next/link";
import { BookOpen, MapPin, Store, Sparkles } from "lucide-react";

interface NavbarProps {
  totalStores?: number;
  totalBooks?: number;
}

export default function Navbar({ totalStores = 14, totalBooks = 38 }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DED3] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Marca / Ex Libris */}
          <Link href="/" className="group flex items-center space-x-3.5 focus:outline-none">
            <div className="w-11 h-11 rounded-lg bg-[#7A2633] text-[#FAF7F2] flex items-center justify-center shadow-md group-hover:bg-[#651D28] transition-colors border border-[#5A1924]">
              <BookOpen className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-[#211B17] group-hover:text-[#7A2633] transition-colors">
                Librerías de Bolivia
              </span>
              <span className="text-[11px] font-sans tracking-widest uppercase text-[#8E8276] -mt-1 font-medium">
                Catálogo & Comparador Unificado
              </span>
            </div>
          </Link>

          {/* Indicadores en vivo */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Badge de librerías conectadas */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#F3ECE1] border border-[#E6DED3] text-xs font-medium text-[#63574D]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BD7B31] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BD7B31]"></span>
              </span>
              <span>{totalStores} librerías y editoriales</span>
            </div>

            {/* Ciudades con presencia */}
            <div className="flex items-center space-x-1.5 text-xs text-[#63574D]">
              <MapPin className="w-3.5 h-3.5 text-[#BD7B31]" />
              <span>La Paz · Cochabamba · Santa Cruz · Envíos</span>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
