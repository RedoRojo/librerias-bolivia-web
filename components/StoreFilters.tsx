"use client";

import { Store } from "@/lib/types";
import { SlidersHorizontal, CheckCircle2, ArrowUpDown } from "lucide-react";

interface StoreFiltersProps {
  stores: Store[];
  selectedStoreId: number | null;
  onSelectStore: (id: number | null) => void;
  inStockOnly: boolean;
  onToggleInStock: (val: boolean) => void;
  sortBy: string;
  onChangeSort: (val: string) => void;
  totalFound: number;
}

export default function StoreFilters({
  stores,
  selectedStoreId,
  onSelectStore,
  inStockOnly,
  onToggleInStock,
  sortBy,
  onChangeSort,
  totalFound,
}: StoreFiltersProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      
      {/* Pestañas de estante de librerías */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-3 pt-1 scrollbar-thin">
        <button
          type="button"
          onClick={() => onSelectStore(null)}
          className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            selectedStoreId === null
              ? "bg-[#7A2633] text-[#FAF7F2] shadow-sm border border-[#651D28]"
              : "bg-[#FFFFFF] text-[#63574D] hover:text-[#211B17] hover:bg-[#F3ECE1] border border-[#E6DED3]"
          }`}
        >
          Todas las Librerías
        </button>

        {stores.map((s) => {
          const isSelected = selectedStoreId === s.store_id;
          return (
            <button
              key={s.store_id}
              type="button"
              onClick={() => onSelectStore(s.store_id)}
              className={`shrink-0 flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                isSelected
                  ? "bg-[#7A2633] text-[#FAF7F2] shadow-sm border border-[#651D28]"
                  : "bg-[#FFFFFF] text-[#63574D] hover:text-[#211B17] hover:bg-[#F3ECE1] border border-[#E6DED3]"
              }`}
            >
              <span>{s.name}</span>
              {s.is_publisher_store && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans uppercase ${
                  isSelected ? "bg-[#5A1924] text-amber-200" : "bg-[#F3ECE1] text-[#7A2633]"
                }`}>
                  Editorial
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Barra de herramientas secundaria (Conteo + Filtros) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E6DED3]">
        
        {/* Conteo de resultados */}
        <div className="text-sm text-[#63574D] font-medium">
          <span className="font-bold text-[#211B17] text-base">{totalFound}</span> {totalFound === 1 ? "libro encontrado" : "libros encontrados"}
        </div>

        {/* Controles de filtro y ordenación */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          
          {/* Switch de solo en stock */}
          <button
            type="button"
            onClick={() => onToggleInStock(!inStockOnly)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              inStockOnly
                ? "bg-[#254433] text-[#FAF7F2] border-[#1D3528]"
                : "bg-[#FFFFFF] text-[#63574D] border-[#E6DED3] hover:bg-[#F3ECE1]"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Solo en stock</span>
          </button>

          {/* Selector de ordenamiento */}
          <div className="flex items-center space-x-1.5 bg-[#FFFFFF] border border-[#E6DED3] rounded-lg px-2.5 py-1.5 text-xs text-[#63574D]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#BD7B31]" />
            <select
              value={sortBy}
              onChange={(e) => onChangeSort(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-[#211B17] font-medium pr-1"
            >
              <option value="relevance">Relevancia</option>
              <option value="price_asc">Menor a mayor precio</option>
              <option value="price_desc">Mayor a menor precio</option>
              <option value="title_asc">Título (A-Z)</option>
            </select>
          </div>

        </div>

      </div>

    </div>
  );
}
