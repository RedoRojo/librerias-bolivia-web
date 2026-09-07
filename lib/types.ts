export interface Offer {
  offer_id: number;
  store_id: number;
  store_name: string;
  store_slug: string;
  store_city: string | null;
  price_bob: number;
  is_in_stock: boolean;
  stock_label: string;
  product_url: string;
}

export interface Book {
  book_id: number;
  title: string;
  author: string | null;
  isbn: string | null;
  publisher_name: string;
  cover_image_url: string | null;
  synopsis: string | null;
  best_price_bob: number | null;
  offers_count: number;
  available_in_stock: boolean;
  offers: Offer[];
}

export interface BookSearchResponse {
  total: number;
  limit: number;
  offset: number;
  results: Book[];
}

export interface Store {
  store_id: number;
  name: string;
  slug: string;
  city: string | null;
  website_url: string;
  cms_type: string;
  is_publisher_store: boolean;
  total_books_in_stock: number;
}

export interface Publisher {
  publisher_id: number;
  name: string;
  slug: string;
  country: string | null;
  total_books: number;
}

export interface CatalogStats {
  total_books_indexed: number;
  total_offers_active: number;
  total_stores_covered: number;
  total_publishers: number;
}
