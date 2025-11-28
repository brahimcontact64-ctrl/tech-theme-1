export interface Product {
  id: string;
  category_id: string;
  name_fr: string;
  name_ar: string;
  description_fr: string;
  description_ar: string;
  price_dzd: number;
  original_price_dzd?: number;
  image_url: string;
  images: string[];
  specs: Record<string, string>;
  stock: number;
  is_featured: boolean;
  is_flash_sale: boolean;
  flash_sale_end?: string;
  slug: string;
  created_at: string;
}

export interface Category {
  id: string;
  name_fr: string;
  name_ar: string;
  slug: string;
  icon: string;
  display_order: number;
  created_at: string;
}

export interface Deal {
  id: string;
  title_fr: string;
  title_ar: string;
  description_fr: string;
  description_ar: string;
  discount_percent: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
}

export type Language = 'fr' | 'ar';
