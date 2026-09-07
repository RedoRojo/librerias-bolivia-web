"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import StoreFilters from "@/components/StoreFilters";
import BookCard from "@/components/BookCard";
import BookModal from "@/components/BookModal";
import Footer from "@/components/Footer";
import { fetchBooks, fetchStores, fetchStats } from "@/lib/api";
import { Book, Store, CatalogStats } from "@/lib/types";
import { BookX, Loader2, Sparkles } from "lucide-react";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const [books, setBooks] = useState<Book[]>([]);
  const [totalFound, setTotalFound] = useState(0);
  const [stores, setStores] = useState<Store[]>([]);
  const [stats, setStats] = useState<CatalogStats | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Cargar tiendas y estadísticas iniciales
  useEffect(() => {
    async function loadMeta() {
      const [loadedStores, loadedStats] = await Promise.all([
        fetchStores(),
        fetchStats()
      ]);
      setStores(loadedStores);
      setStats(loadedStats);
    }
    loadMeta();
  }, []);

  // Cargar libros según filtros
  const loadBooks = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await fetchBooks({
        q: query,
        store_id: selectedStoreId || undefined,
        in_stock_only: inStockOnly,
        sort: sortBy,
        limit: 30
      });
      setBooks(resp.results);
      setTotalFound(resp.total);
    } catch (e) {
      console.error("Error al cargar libros:", e);
    } finally {
      setIsLoading(false);
    }
  }, [query, selectedStoreId, inStockOnly, sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadBooks();
    }, 250);
    return () => clearTimeout(timer);
  }, [loadBooks]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      
      {/* Barra de navegación superior */}
      <Navbar 
        totalStores={stats?.total_stores_covered || stores.length} 
        totalBooks={stats?.total_books_indexed} 
      />

      {/* Hero y Buscador Central */}
      <HeroSearch
        initialQuery={query}
        onSearch={(q) => setQuery(q)}
        isLoading={isLoading}
      />

      {/* Barra de Filtros y Estantería */}
      <StoreFilters
        stores={stores}
        selectedStoreId={selectedStoreId}
        onSelectStore={(id) => setSelectedStoreId(id)}
        inStockOnly={inStockOnly}
        onToggleInStock={(val) => setInStockOnly(val)}
        sortBy={sortBy}
        onChangeSort={(val) => setSortBy(val)}
        totalFound={totalFound}
      />

      {/* Sección del Catálogo de Libros */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {isLoading && books.length === 0 ? (
          <div className="py-24 text-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#BD7B31] mx-auto mb-4" />
            <p className="text-base font-medium text-[#63574D]">
              Consultando las estanterías de Bolivia...
            </p>
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.book_id}
                book={book}
                onSelectBook={(b) => setSelectedBook(b)}
              />
            ))}
          </div>
        ) : (
          /* Estado sin resultados estilo biblioteca */
          <div className="max-w-md mx-auto py-16 px-6 text-center rounded-3xl bg-[#FFFFFF] border-2 border-dashed border-[#E6DED3] my-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#F3ECE1] text-[#7A2633] flex items-center justify-center mx-auto mb-4">
              <BookX className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-[#211B17] mb-2">
              No encontramos ese título en esta búsqueda
            </h3>
            <p className="text-sm text-[#63574D] mb-6 font-sans">
              Prueba buscando por palabras clave más cortas, el apellido del autor (ej. &ldquo;Borges&rdquo;) o limpiando los filtros de tienda.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedStoreId(null);
                setInStockOnly(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#7A2633] hover:bg-[#651D28] text-[#FAF7F2] text-xs font-medium transition-colors"
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}
      </main>

      {/* Modal Ficha Completa */}
      <BookModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      {/* Pie de página */}
      <Footer stores={stores} />

    </div>
  );
}
