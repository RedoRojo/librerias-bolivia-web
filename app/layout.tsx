import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Librerías de Bolivia — Buscador y Comparador de Libros",
  description: "Encuentra cualquier libro en las librerías y editoriales de Bolivia. Compara precios en Bolivianos, consulta disponibilidad y apoya a las librerías locales.",
  keywords: ["libros bolivia", "librerias bolivia", "comprar libros bolivia", "la paz", "santa cruz", "cochabamba", "plural editores", "editorial kipus"],
  authors: [{ name: "Librerías de Bolivia" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${plusJakarta.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans paper-texture text-ink selection:bg-amber-200 selection:text-ink">
        {children}
      </body>
    </html>
  );
}
