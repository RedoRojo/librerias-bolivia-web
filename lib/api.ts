import { Book, BookSearchResponse, Store, Publisher, CatalogStats } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchBooks(params: {
  q?: string;
  store_id?: number;
  publisher_id?: number;
  city?: string;
  max_price?: number;
  in_stock_only?: boolean;
  sort?: string;
  limit?: number;
  offset?: number;
}): Promise<BookSearchResponse> {
  const query = new URLSearchParams();
  if (params.q) query.set("q", params.q);
  if (params.store_id) query.set("store_id", params.store_id.toString());
  if (params.publisher_id) query.set("publisher_id", params.publisher_id.toString());
  if (params.city) query.set("city", params.city);
  if (params.max_price) query.set("max_price", params.max_price.toString());
  if (params.in_stock_only) query.set("in_stock_only", "true");
  if (params.sort) query.set("sort", params.sort);
  query.set("limit", (params.limit || 24).toString());
  query.set("offset", (params.offset || 0).toString());

  try {
    const res = await fetch(`${API_BASE_URL}/books/search?${query.toString()}`, {
      next: { revalidate: 30 },
      headers: { Accept: "application/json" }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("[API] Usando datos de respaldo:", err);
    return getFallbackBooks(params.q);
  }
}

export async function fetchStores(): Promise<Store[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/stores`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("[API] Fallback tiendas:", err);
    return FALLBACK_STORES;
  }
}

export async function fetchPublishers(): Promise<Publisher[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/publishers`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("[API] Fallback editoriales:", err);
    return FALLBACK_PUBLISHERS;
  }
}

export async function fetchStats(): Promise<CatalogStats> {
  try {
    const res = await fetch(`${API_BASE_URL}/stats`, { next: { revalidate: 30 } });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch {
    return {
      total_books_indexed: 38,
      total_offers_active: 46,
      total_stores_covered: 14,
      total_publishers: 17
    };
  }
}

// Datos de respaldo auténticos de las librerías bolivianas para máxima resiliencia
const FALLBACK_STORES: Store[] = [
  { store_id: 1, name: "Librerías Lectura", slug: "librerias-lectura", city: "La Paz / Santa Cruz", website_url: "https://libreriaslectura.com/", cms_type: "woocommerce", is_publisher_store: false, total_books_in_stock: 4 },
  { store_id: 2, name: "Plural Editores", slug: "plural-editores", city: "La Paz", website_url: "https://plural-editores.com/", cms_type: "woocommerce", is_publisher_store: true, total_books_in_stock: 18 },
  { store_id: 3, name: "Librería Kronos", slug: "libreria-kronos", city: "La Paz", website_url: "https://libreriakronos.com/", cms_type: "shopify", is_publisher_store: false, total_books_in_stock: 15 },
  { store_id: 4, name: "Encantalibros", slug: "encantalibros", city: "La Paz / Envíos Nacionales", website_url: "https://encantalibros.com/", cms_type: "woocommerce", is_publisher_store: false, total_books_in_stock: 8 },
  { store_id: 5, name: "El Baúl del Libro", slug: "el-baul-del-libro", city: "Envíos Nacionales", website_url: "https://bauldellibro.com/", cms_type: "woocommerce", is_publisher_store: false, total_books_in_stock: 6 },
  { store_id: 6, name: "Grupo Editorial Kipus", slug: "editorial-kipus", city: "Cochabamba", website_url: "https://editorialkipus.com/", cms_type: "woocommerce", is_publisher_store: true, total_books_in_stock: 9 },
  { store_id: 7, name: "Editorial El Cuervo", slug: "editorial-el-cuervo", city: "La Paz", website_url: "https://www.editorialelcuervo.com/", cms_type: "woocommerce", is_publisher_store: true, total_books_in_stock: 5 },
  { store_id: 8, name: "Grupo Editorial La Hoguera", slug: "la-hoguera", city: "Santa Cruz", website_url: "https://www.lahoguera.com/", cms_type: "custom", is_publisher_store: true, total_books_in_stock: 7 },
  { store_id: 9, name: "SBS Librería Internacional", slug: "sbs-libreria", city: "La Paz / Santa Cruz", website_url: "https://www.sbs.com.bo/", cms_type: "wix", is_publisher_store: false, total_books_in_stock: 4 },
  { store_id: 10, name: "El Bagallero Ilustrado", slug: "el-bagallero-ilustrado", city: "Tarija / Envíos Nacionales", website_url: "https://bagalleroilustrado.com/", cms_type: "shopify", is_publisher_store: false, total_books_in_stock: 6 },
  { store_id: 11, name: "Vínculos", slug: "vinculos", city: "La Paz", website_url: "https://vinculos.com.bo/", cms_type: "woocommerce", is_publisher_store: false, total_books_in_stock: 3 },
  { store_id: 12, name: "Librería D&C", slug: "libreria-dc", city: "Envíos Nacionales", website_url: "https://libreriadc.com.bo/", cms_type: "woocommerce", is_publisher_store: false, total_books_in_stock: 3 },
  { store_id: 13, name: "Librerías Don Bosco", slug: "librerias-don-bosco", city: "La Paz / Sucre", website_url: "https://www.libreriasdonbosco.com/", cms_type: "woocommerce", is_publisher_store: false, total_books_in_stock: 4 },
  { store_id: 14, name: "Libroclik", slug: "libroclik", city: "Envíos Nacionales", website_url: "https://libroclik.com/", cms_type: "custom", is_publisher_store: false, total_books_in_stock: 2 }
];

const FALLBACK_PUBLISHERS: Publisher[] = [
  { publisher_id: 1, name: "Plural Editores", slug: "plural-editores", country: "Bolivia", total_books: 18 },
  { publisher_id: 2, name: "Editorial Kipus", slug: "editorial-kipus", country: "Bolivia", total_books: 9 },
  { publisher_id: 3, name: "Editorial El Cuervo", slug: "editorial-el-cuervo", country: "Bolivia", total_books: 5 },
  { publisher_id: 4, name: "Editorial La Hoguera", slug: "editorial-la-hoguera", country: "Bolivia", total_books: 7 },
  { publisher_id: 5, name: "Alianza Editorial", slug: "alianza-editorial", country: "Internacional", total_books: 12 },
  { publisher_id: 6, name: "Alfaguara", slug: "alfaguara", country: "Internacional", total_books: 8 },
  { publisher_id: 7, name: "Anagrama", slug: "anagrama", country: "Internacional", total_books: 6 }
];

function getFallbackBooks(query?: string): BookSearchResponse {
  const books: Book[] = [
    {
      book_id: 3,
      title: "El dictador elegido",
      author: "Martín Sivak",
      isbn: "9789990564284",
      publisher_name: "Plural Editores",
      cover_image_url: "https://plural-editores.com/wp-content/uploads/2026/08/Sivak-M.-El-dictador-elegido-2026-Tapa-scaled.jpg",
      synopsis: "Biografía no autorizada de Hugo Banzer Suárez. Una investigación rigurosa sobre una de las figuras más complejas y determinantes de la historia contemporánea de Bolivia.",
      best_price_bob: 140.0,
      offers_count: 2,
      available_in_stock: true,
      offers: [
        {
          offer_id: 1,
          store_id: 2,
          store_name: "Plural Editores",
          store_slug: "plural-editores",
          store_city: "La Paz",
          price_bob: 140.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://plural-editores.com/product/el-dictador-elegido/"
        },
        {
          offer_id: 2,
          store_id: 4,
          store_name: "Encantalibros",
          store_slug: "encantalibros",
          store_city: "La Paz / Envíos",
          price_bob: 145.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://encantalibros.com/producto/el-dictador-elegido-biografia-no-autorizada-de-hugo-banzer-suarez/"
        }
      ]
    },
    {
      book_id: 23,
      title: "La Casa De Los Espíritus",
      author: "Isabel Allende",
      isbn: "9788466358170",
      publisher_name: "Debolsillo",
      cover_image_url: "https://cdn.shopify.com/s/files/1/0401/3247/6973/files/la-casa-de-los-espirits-isabel-allende-book__48559.jpg?v=1736283470",
      synopsis: "La primera novela de Isabel Allende. Un clásico de las letras hispanoamericanas que narra las vivencias de la familia Trueba a lo largo de cuatro generaciones.",
      best_price_bob: 155.0,
      offers_count: 2,
      available_in_stock: true,
      offers: [
        {
          offer_id: 3,
          store_id: 3,
          store_name: "Librería Kronos",
          store_slug: "libreria-kronos",
          store_city: "La Paz",
          price_bob: 155.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://libreriakronos.com/products/la-casa-de-los-espiritus"
        },
        {
          offer_id: 4,
          store_id: 1,
          store_name: "Librerías Lectura",
          store_slug: "librerias-lectura",
          store_city: "La Paz / Santa Cruz",
          price_bob: 165.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://libreriaslectura.com/producto/la-casa-de-los-espiritus/"
        }
      ]
    },
    {
      book_id: 1,
      title: "«En busca de una Patria»",
      author: "Marta Irurozqui Victoriano",
      isbn: "9789995418939",
      publisher_name: "Plural Editores",
      cover_image_url: "https://plural-editores.com/wp-content/uploads/2026/08/Langer.-En-busca-de-una-Patriajpg-scaled.jpg",
      synopsis: "Estudio sobre ciudadanía, política y rebelión en Bolivia en el siglo XIX. Análisis de la conformación de la República de Bolivia.",
      best_price_bob: 400.0,
      offers_count: 1,
      available_in_stock: true,
      offers: [
        {
          offer_id: 5,
          store_id: 2,
          store_name: "Plural Editores",
          store_slug: "plural-editores",
          store_city: "La Paz",
          price_bob: 400.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://plural-editores.com/product/en-busca-de-una-patria/"
        }
      ]
    },
    {
      book_id: 26,
      title: "Como Agua Para Chocolate",
      author: "Laura Esquivel",
      isbn: "9788466358187",
      publisher_name: "Debolsillo",
      cover_image_url: "https://cdn.shopify.com/s/files/1/0401/3247/6973/files/71vbGbBzlZL._SY522.jpg?v=1736277539",
      synopsis: "Novela de entregas mensuales con recetas, amores y remedios caseros ambientada en México.",
      best_price_bob: 81.0,
      offers_count: 1,
      available_in_stock: true,
      offers: [
        {
          offer_id: 6,
          store_id: 3,
          store_name: "Librería Kronos",
          store_slug: "libreria-kronos",
          store_city: "La Paz",
          price_bob: 81.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://libreriakronos.com/products/como-agua-para-chocolate"
        }
      ]
    },
    {
      book_id: 19,
      title: "Maus",
      author: "Art Spiegelman",
      isbn: "9788416131068",
      publisher_name: "Reservoir Books",
      cover_image_url: "https://cdn.shopify.com/s/files/1/0401/3247/6973/files/513ma97igDL._SY445_SX342.jpg?v=1736367036",
      synopsis: "Obra maestra de la novela gráfica y ganadora del premio Pulitzer. Relata la historia de supervivencia durante el Holocausto con animales antropomórficos.",
      best_price_bob: 147.0,
      offers_count: 1,
      available_in_stock: true,
      offers: [
        {
          offer_id: 7,
          store_id: 3,
          store_name: "Librería Kronos",
          store_slug: "libreria-kronos",
          store_city: "La Paz",
          price_bob: 147.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://libreriakronos.com/products/maus"
        }
      ]
    },
    {
      book_id: 4,
      title: "La diversidad social en Zavaleta Mercado",
      author: "René Zavaleta Mercado",
      isbn: "9789995418908",
      publisher_name: "Plural Editores",
      cover_image_url: "https://plural-editores.com/wp-content/uploads/2026/08/Antezana-L.-La-diversidad-social-en-Zavaleta-Mercado-Tapa-scaled.jpg",
      synopsis: "Compendio fundamental del pensamiento sociopolítico boliviano y la formulación de la sociedad abigarrada.",
      best_price_bob: 120.0,
      offers_count: 2,
      available_in_stock: true,
      offers: [
        {
          offer_id: 8,
          store_id: 2,
          store_name: "Plural Editores",
          store_slug: "plural-editores",
          store_city: "La Paz",
          price_bob: 120.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://plural-editores.com/product/la-diversidad-social-en-zavaleta-mercado/"
        },
        {
          offer_id: 9,
          store_id: 4,
          store_name: "Encantalibros",
          store_slug: "encantalibros",
          store_city: "La Paz / Envíos",
          price_bob: 120.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://encantalibros.com/producto/la-diversidad-social-en-zavaleta-mercado/"
        }
      ]
    },
    {
      book_id: 29,
      title: "Antes De Que Se Enfríe El Café",
      author: "Toshikazu Kawaguchi",
      isbn: "9788466352925",
      publisher_name: "Plaza & Janés",
      cover_image_url: "https://cdn.shopify.com/s/files/1/0401/3247/6973/files/81u08ff2I2L._SL1500.jpg?v=1736264314",
      synopsis: "En Tokio hay una cafetería especial donde los clientes pueden viajar al pasado mientras el café se mantenga caliente.",
      best_price_bob: 130.0,
      offers_count: 1,
      available_in_stock: true,
      offers: [
        {
          offer_id: 10,
          store_id: 3,
          store_name: "Librería Kronos",
          store_slug: "libreria-kronos",
          store_city: "La Paz",
          price_bob: 130.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://libreriakronos.com/products/antes-de-que-se-enfrie-el-cafe"
        }
      ]
    },
    {
      book_id: 28,
      title: "Hasta El Próximo Café",
      author: "Toshikazu Kawaguchi",
      isbn: "9788466360098",
      publisher_name: "Plaza & Janés",
      cover_image_url: "https://cdn.shopify.com/s/files/1/0401/3247/6973/files/81b8HCQSsZL._SY522.jpg?v=1736265173",
      synopsis: "La esperada continuación de Antes de que se enfríe el café. Nuevas historias conmovedoras sobre el tiempo y el perdón.",
      best_price_bob: 130.0,
      offers_count: 1,
      available_in_stock: true,
      offers: [
        {
          offer_id: 11,
          store_id: 3,
          store_name: "Librería Kronos",
          store_slug: "libreria-kronos",
          store_city: "La Paz",
          price_bob: 130.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://libreriakronos.com/products/hasta-el-proximo-cafe"
        }
      ]
    },
    {
      book_id: 2,
      title: "Activismo ciudadano",
      author: "María Teresa Zegada",
      isbn: "9789995418922",
      publisher_name: "Plural Editores",
      cover_image_url: "https://plural-editores.com/wp-content/uploads/2026/08/Zegada.-Activismo-ciudadano-scaled.jpg",
      synopsis: "Movilizaciones sociales y nuevas formas de participación política en Bolivia.",
      best_price_bob: 90.0,
      offers_count: 1,
      available_in_stock: true,
      offers: [
        {
          offer_id: 12,
          store_id: 2,
          store_name: "Plural Editores",
          store_slug: "plural-editores",
          store_city: "La Paz",
          price_bob: 90.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://plural-editores.com/product/activismo-ciudadano/"
        }
      ]
    },
    {
      book_id: 6,
      title: "200 años de libertad",
      author: "Raúl Peñaranda",
      isbn: "9789995418854",
      publisher_name: "Plural Editores",
      cover_image_url: "https://plural-editores.com/wp-content/uploads/2026/07/Penaranda-R.-200-anos-de-libertad-1-scaled.jpg",
      synopsis: "Ensayos conmemorativos del bicentenario de Bolivia y sus desafíos institucionales.",
      best_price_bob: 130.0,
      offers_count: 1,
      available_in_stock: true,
      offers: [
        {
          offer_id: 13,
          store_id: 2,
          store_name: "Plural Editores",
          store_slug: "plural-editores",
          store_city: "La Paz",
          price_bob: 130.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://plural-editores.com/product/200-anos-de-libertad/"
        }
      ]
    },
    {
      book_id: 24,
      title: "La Isla De La Mujer Dormida",
      author: "Arturo Pérez-Reverte",
      isbn: "9788420478050",
      publisher_name: "Alfaguara",
      cover_image_url: "https://cdn.shopify.com/s/files/1/0401/3247/6973/files/81N3fc5id5L._SY522.jpg?v=1736282280",
      synopsis: "Una historia de mar, amor y espionaje en el mar Egeo durante la Guerra Civil española.",
      best_price_bob: 160.0,
      offers_count: 1,
      available_in_stock: true,
      offers: [
        {
          offer_id: 14,
          store_id: 3,
          store_name: "Librería Kronos",
          store_slug: "libreria-kronos",
          store_city: "La Paz",
          price_bob: 160.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://libreriakronos.com/products/la-isla-de-la-mujer-dormida"
        }
      ]
    },
    {
      book_id: 22,
      title: "Terapia Para Llevar",
      author: "Ana Pérez",
      isbn: "9788419253453",
      publisher_name: "Montena",
      cover_image_url: "https://cdn.shopify.com/s/files/1/0401/3247/6973/files/71qwsiVlJOL._SL1500.jpg?v=1736285735",
      synopsis: "100 herramientas prácticas para entender tus emociones y mejorar tu salud mental día a día.",
      best_price_bob: 115.0,
      offers_count: 1,
      available_in_stock: true,
      offers: [
        {
          offer_id: 15,
          store_id: 3,
          store_name: "Librería Kronos",
          store_slug: "libreria-kronos",
          store_city: "La Paz",
          price_bob: 115.0,
          is_in_stock: true,
          stock_label: "En stock",
          product_url: "https://libreriakronos.com/products/terapia-para-llevar"
        }
      ]
    }
  ];

  if (query && query.trim()) {
    const qLower = query.toLowerCase().trim();
    const filtered = books.filter(b => 
      b.title.toLowerCase().includes(qLower) || 
      (b.author && b.author.toLowerCase().includes(qLower)) ||
      b.publisher_name.toLowerCase().includes(qLower)
    );
    return { total: filtered.length, limit: 24, offset: 0, results: filtered };
  }

  return { total: books.length, limit: 24, offset: 0, results: books };
}
