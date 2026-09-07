"use client";

import { useState, useEffect } from "react";
import { Book } from "@/lib/types";
import { X, ExternalLink, BookOpen, MapPin, CheckCircle2, XCircle, Building2 } from "lucide-react";

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
}

export default function BookModal({ book, onClose }: BookModalProps) {
  const cleanIsbn = book?.isbn ? book.isbn.replace(/[^0-9X]/gi, "") : "";
  const initialCover = book?.cover_image_url || (cleanIsbn ? `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg` : null);

  const [modalImg, setModalImg] = useState<string | null>(initialCover);
  const [modalImgFailed, setModalImgFailed] = useState(false);

  useEffect(() => {
    if (book) {
      const isbn = book.isbn ? book.isbn.replace(/[^0-9X]/gi, "") : "";
      setModalImg(book.cover_image_url || (isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg` : null));
      setModalImgFailed(false);
    }
  }, [book]);

  if (!book) return null;

  const sortedOffers = [...book.offers].sort((a, b) => {
    if (a.is_in_stock && !b.is_in_stock) return -1;
    if (!a.is_in_stock && b.is_in_stock) return 1;
    return a.price_bob - b.price_bob;
  });

  const handleImageError = () => {
    if (modalImg && cleanIsbn && !modalImg.includes("openlibrary.org")) {
      setModalImg(`https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg`);
    } else {
      setModalImgFailed(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#211B17]/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Contenedor Modal */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FAF7F2] rounded-3xl border-2 border-[#E6DED3] shadow-2xl book-shadow"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#FFFFFF] hover:bg-[#F3ECE1] text-[#63574D] hover:text-[#211B17] border border-[#E6DED3] transition-colors"
          title="Cerrar ficha"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          {/* Fila principal: Portada y Encabezado */}
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            
            {/* Portada */}
            <div className="w-full sm:w-52 shrink-0 h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-[#FAF6EE] to-[#EFE6D9] border border-[#E6DED3] p-3 flex items-center justify-center shadow-md">
              {modalImg && !modalImgFailed ? (
                <div className="relative h-full flex items-center justify-center drop-shadow-[0_8px_16px_rgba(33,27,23,0.2)]">
                  <img
                    src={modalImg}
                    alt={book.title}
                    onError={handleImageError}
                    className="max-h-full max-w-full object-contain rounded-[3px] border-l border-black/10"
                  />
                </div>
              ) : (
                <div className="w-36 h-48 rounded-md bg-[#254433] text-[#FAF7F2] p-3.5 flex flex-col justify-between shadow-md border-l-4 border-[#BD7B31] text-center">
                  <div className="flex items-center justify-center pt-2">
                    <BookOpen className="w-6 h-6 text-[#FAF7F2]/60" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight line-clamp-3 mb-1 text-[#FAF7F2]">
                      {book.title}
                    </p>
                    {book.author && (
                      <p className="text-[10px] text-[#FAF7F2]/75 line-clamp-1">
                        {book.author}
                      </p>
                    )}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-[#BD7B31] font-semibold">
                    Edición Bolivia
                  </span>
                </div>
              )}
            </div>

            {/* Metadatos y Autor */}
            <div className="flex-1 flex flex-col justify-center">
              
              <div className="inline-flex items-center space-x-2 text-xs text-[#7A2633] font-semibold mb-2">
                <Building2 className="w-3.5 h-3.5 text-[#BD7B31]" />
                <span>Editorial: {book.publisher_name}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#211B17] leading-tight mb-2 tracking-tight">
                {book.title}
              </h2>

              {book.author && (
                <p className="text-base font-medium text-[#63574D] mb-4">
                  por {book.author}
                </p>
              )}

              {/* Fila de metadatos ISBN */}
              <div className="flex flex-wrap gap-2 text-xs text-[#63574D] pt-2 border-t border-[#E6DED3]">
                {book.isbn && (
                  <span className="bg-[#FFFFFF] px-2.5 py-1 rounded-lg border border-[#E6DED3]">
                    <strong className="text-[#211B17]">ISBN:</strong> {book.isbn}
                  </span>
                )}
                <span className="bg-[#FFFFFF] px-2.5 py-1 rounded-lg border border-[#E6DED3]">
                  <strong className="text-[#211B17]">Ofertas:</strong> {sortedOffers.length} librerías
                </span>
              </div>

            </div>

          </div>

          {/* Sinopsis */}
          {book.synopsis && (
            <div className="mb-8 p-5 rounded-2xl bg-[#FFFFFF] border border-[#E6DED3]">
              <h4 className="font-bold text-xs text-[#211B17] mb-2 uppercase tracking-wider">
                Sinopsis & Reseña
              </h4>
              <p className="text-sm text-[#63574D] leading-relaxed">
                {book.synopsis}
              </p>
            </div>
          )}

          {/* Comparativa de Precios y Tiendas */}
          <div>
            <h4 className="font-bold text-base text-[#211B17] mb-4 flex items-center justify-between">
              <span>Librerías Disponibles en Bolivia</span>
              <span className="text-xs font-normal text-[#8E8276]">Ordenadas por menor precio</span>
            </h4>

            <div className="space-y-2.5">
              {sortedOffers.map((offer, idx) => (
                <div
                  key={offer.offer_id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all ${
                    idx === 0 
                      ? "bg-[#FFFFFF] border-[#BD7B31] shadow-sm" 
                      : "bg-[#FFFFFF] border-[#E6DED3] hover:border-[#D5C8B8]"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                    <div className={`p-2 rounded-xl ${
                      offer.is_in_stock ? "bg-[#E9F1EC] text-[#254433]" : "bg-[#FAEFEB] text-[#99483B]"
                    }`}>
                      {offer.is_in_stock ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <XCircle className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm text-[#211B17]">
                          {offer.store_name}
                        </span>
                        {idx === 0 && (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#BD7B31] text-[#FAF7F2]">
                            Mejor Precio
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3 text-xs text-[#8E8276] mt-0.5">
                        {offer.store_city && (
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{offer.store_city}</span>
                          </span>
                        )}
                        <span>·</span>
                        <span className={offer.is_in_stock ? "text-[#254433] font-medium" : "text-[#99483B]"}>
                          {offer.stock_label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end space-x-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E6DED3]">
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-[#7A2633] tracking-tight">
                        Bs. {offer.price_bob.toFixed(2)}
                      </span>
                    </div>

                    <a
                      href={offer.product_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#7A2633] hover:bg-[#651D28] text-[#FAF7F2] font-semibold text-xs transition-colors shadow-sm"
                    >
                      <span>Comprar en tienda</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
