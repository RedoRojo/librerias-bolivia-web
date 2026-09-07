"use client";

import { Book } from "@/lib/types";
import { ExternalLink, BookOpen, Check, Store, Info } from "lucide-react";

interface BookCardProps {
  book: Book;
  onSelectBook: (book: Book) => void;
}

export default function BookCard({ book, onSelectBook }: BookCardProps) {
  // Ordenar ofertas por disponibilidad y precio más bajo
  const sortedOffers = [...book.offers].sort((a, b) => {
    if (a.is_in_stock && !b.is_in_stock) return -1;
    if (!a.is_in_stock && b.is_in_stock) return 1;
    return a.price_bob - b.price_bob;
  });

  const bestOffer = sortedOffers[0];
  const hasMultipleOffers = sortedOffers.length > 1;

  return (
    <article className="group flex flex-col justify-between rounded-2xl bg-[#FFFFFF] border border-[#E6DED3] hover:border-[#D5C8B8] book-shadow book-shadow-hover overflow-hidden transition-all duration-300">
      
      {/* Cabecera de la tarjeta / Portada e Información Básica */}
      <div className="p-5">
        
        {/* Fila superior: Editorial y conteo de ofertas */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#F3ECE1] text-[#7A2633] text-xs font-serif font-medium border border-[#E6DED3]">
            {book.publisher_name}
          </span>
          
          {hasMultipleOffers && (
            <span className="text-[11px] font-sans font-medium text-[#BD7B31] bg-[#FDF8EE] px-2 py-0.5 rounded-full border border-[#F3DFC4]">
              {sortedOffers.length} librerías
            </span>
          )}
        </div>

        {/* Portada del libro */}
        <div className="relative aspect-[3/4] max-h-56 w-full rounded-xl bg-[#F6F1E9] border border-[#E6DED3] overflow-hidden mb-4 flex items-center justify-center book-spine-crease">
          {book.cover_image_url ? (
            <img
              src={book.cover_image_url}
              alt={`Portada de ${book.title}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-[#EAE2D5] flex items-center justify-center text-[#7A2633] mb-2">
                <BookOpen className="w-6 h-6 stroke-[1.5]" />
              </div>
              <span className="font-serif text-xs text-[#8E8276] italic line-clamp-2 px-2">
                {book.title}
              </span>
            </div>
          )}
        </div>

        {/* Título y Autor */}
        <h3 
          onClick={() => onSelectBook(book)}
          className="font-serif font-bold text-lg text-[#211B17] leading-snug line-clamp-2 mb-1.5 cursor-pointer hover:text-[#7A2633] transition-colors"
          title={book.title}
        >
          {book.title}
        </h3>

        {book.author && (
          <p className="font-serif italic text-sm text-[#63574D] line-clamp-1 mb-2">
            por {book.author}
          </p>
        )}

        {book.synopsis && (
          <p className="text-xs text-[#8E8276] line-clamp-2 mb-3 leading-relaxed">
            {book.synopsis}
          </p>
        )}

      </div>

      {/* Caja Comparativa de Precios y Disponibilidad */}
      <div className="bg-[#FAF7F2] border-t border-[#E6DED3] p-4 flex flex-col gap-3">
        
        {/* Mejor precio destacado */}
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-serif uppercase tracking-wider text-[#8E8276]">
            {hasMultipleOffers ? "Mejor precio:" : "Precio oficial:"}
          </span>
          <span className="font-serif text-xl font-bold text-[#7A2633]">
            {bestOffer ? `Bs. ${bestOffer.price_bob.toFixed(2)}` : "Consultar"}
          </span>
        </div>

        {/* Lista de tiendas con disponibilidad */}
        <div className="space-y-1.5 pt-1">
          {sortedOffers.slice(0, 2).map((offer) => (
            <div
              key={offer.offer_id}
              className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-[#FFFFFF] border border-[#E6DED3]/80"
            >
              <div className="flex items-center space-x-1.5 truncate pr-2">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  offer.is_in_stock ? "bg-[#254433]" : "bg-[#99483B]"
                }`} />
                <span className="font-medium text-[#211B17] truncate">
                  {offer.store_name}
                </span>
                {offer.store_city && (
                  <span className="text-[10px] text-[#8E8276] truncate hidden sm:inline">
                    ({offer.store_city.split("/")[0].trim()})
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <span className="font-mono font-medium text-[#63574D]">
                  Bs. {offer.price_bob.toFixed(2)}
                </span>
                <a
                  href={offer.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded bg-[#F3ECE1] hover:bg-[#7A2633] text-[#7A2633] hover:text-[#FAF7F2] transition-colors"
                  title={`Comprar en ${offer.store_name}`}
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}

          {sortedOffers.length > 2 && (
            <button
              type="button"
              onClick={() => onSelectBook(book)}
              className="w-full text-center text-[11px] font-medium text-[#BD7B31] hover:underline pt-1"
            >
              + ver {sortedOffers.length - 2} opciones más en otras tiendas
            </button>
          )}
        </div>

        {/* Botón ver detalles */}
        <button
          type="button"
          onClick={() => onSelectBook(book)}
          className="w-full mt-1 py-2 px-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F3ECE1] border border-[#E6DED3] text-[#211B17] font-medium text-xs transition-colors flex items-center justify-center space-x-1.5"
        >
          <Info className="w-3.5 h-3.5 text-[#BD7B31]" />
          <span>Ver ficha completa & comparar</span>
        </button>

      </div>

    </article>
  );
}
