/*
  # Hizou TechStore DZ Database Schema

  ## Overview
  This migration creates the database structure for a futuristic electronics e-commerce store
  targeting the Algerian market with bilingual support (French/Arabic).

  ## New Tables

  1. **categories**
     - `id` (uuid, primary key) - Unique identifier
     - `name_fr` (text) - Category name in French
     - `name_ar` (text) - Category name in Arabic
     - `slug` (text, unique) - URL-friendly identifier
     - `icon` (text) - Icon identifier for UI
     - `display_order` (integer) - Sort order for display
     - `created_at` (timestamptz) - Record creation timestamp

  2. **products**
     - `id` (uuid, primary key) - Unique identifier
     - `category_id` (uuid, foreign key) - Reference to categories
     - `name_fr` (text) - Product name in French
     - `name_ar` (text) - Product name in Arabic
     - `description_fr` (text) - Product description in French
     - `description_ar` (text) - Product description in Arabic
     - `price_dzd` (decimal) - Price in Algerian Dinar
     - `original_price_dzd` (decimal, nullable) - Original price for discounts
     - `image_url` (text) - Main product image URL
     - `images` (jsonb) - Array of additional product images
     - `specs` (jsonb) - Product specifications as key-value pairs
     - `stock` (integer) - Available stock quantity
     - `is_featured` (boolean) - Featured product flag
     - `is_flash_sale` (boolean) - Flash sale flag
     - `flash_sale_end` (timestamptz, nullable) - Flash sale end time
     - `slug` (text, unique) - URL-friendly identifier
     - `created_at` (timestamptz) - Record creation timestamp

  3. **deals**
     - `id` (uuid, primary key) - Unique identifier
     - `title_fr` (text) - Deal title in French
     - `title_ar` (text) - Deal title in Arabic
     - `description_fr` (text) - Deal description in French
     - `description_ar` (text) - Deal description in Arabic
     - `discount_percent` (integer) - Discount percentage
     - `start_date` (timestamptz) - Deal start time
     - `end_date` (timestamptz) - Deal end time
     - `is_active` (boolean) - Active status
     - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on all tables
  - Add SELECT policies for public access (read-only e-commerce store)
  - Admin operations would require authenticated policies (not included in this migration)

  ## Sample Data
  - Includes sample categories: PCs, Keyboards, Gaming Chairs, Components, Accessories
  - Includes sample products with realistic Algerian market pricing
  - Includes sample flash deals
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_fr text NOT NULL,
  name_ar text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name_fr text NOT NULL,
  name_ar text NOT NULL,
  description_fr text NOT NULL,
  description_ar text NOT NULL,
  price_dzd decimal(10,2) NOT NULL,
  original_price_dzd decimal(10,2),
  image_url text NOT NULL,
  images jsonb DEFAULT '[]'::jsonb,
  specs jsonb DEFAULT '{}'::jsonb,
  stock integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_flash_sale boolean DEFAULT false,
  flash_sale_end timestamptz,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create deals table
CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_fr text NOT NULL,
  title_ar text NOT NULL,
  description_fr text NOT NULL,
  description_ar text NOT NULL,
  discount_percent integer NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view products"
  ON products FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view active deals"
  ON deals FOR SELECT
  TO anon
  USING (is_active = true);

-- Insert sample categories
INSERT INTO categories (name_fr, name_ar, slug, icon, display_order) VALUES
  ('PCs Gaming', 'أجهزة الكمبيوتر للألعاب', 'pcs-gaming', 'monitor', 1),
  ('Claviers', 'لوحات المفاتيح', 'keyboards', 'keyboard', 2),
  ('Chaises Gaming', 'كراسي الألعاب', 'gaming-chairs', 'armchair', 3),
  ('Composants', 'المكونات', 'components', 'cpu', 4),
  ('Accessoires', 'الإكسسوارات', 'accessories', 'headphones', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (category_id, name_fr, name_ar, description_fr, description_ar, price_dzd, original_price_dzd, image_url, specs, stock, is_featured, is_flash_sale, flash_sale_end, slug) 
SELECT 
  c.id,
  'PC Gaming RTX 4070 Ultra',
  'كمبيوتر ألعاب RTX 4070 Ultra',
  'PC Gaming haute performance avec RTX 4070, Intel i7-13700K, 32GB RAM DDR5, SSD NVMe 1TB. RGB personnalisable.',
  'كمبيوتر ألعاب عالي الأداء مع RTX 4070، Intel i7-13700K، 32 جيجا بايت رام DDR5، SSD NVMe 1 تيرابايت. RGB قابل للتخصيص.',
  285000.00,
  340000.00,
  'https://images.pexels.com/photos/7973122/pexels-photo-7973122.jpeg',
  '{"CPU": "Intel i7-13700K", "GPU": "RTX 4070 12GB", "RAM": "32GB DDR5", "Storage": "1TB NVMe SSD", "RGB": "Oui"}'::jsonb,
  15,
  true,
  true,
  now() + interval '3 days',
  'pc-gaming-rtx-4070-ultra'
FROM categories c WHERE c.slug = 'pcs-gaming'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name_fr, name_ar, description_fr, description_ar, price_dzd, original_price_dzd, image_url, specs, stock, is_featured, slug)
SELECT 
  c.id,
  'Clavier Mécanique RGB Pro',
  'لوحة مفاتيح ميكانيكية RGB Pro',
  'Clavier mécanique avec switchs Cherry MX, RGB 16.8M couleurs, construction aluminium premium.',
  'لوحة مفاتيح ميكانيكية مع مفاتيح Cherry MX، RGB 16.8 مليون لون، بناء ألومنيوم متميز.',
  12500.00,
  NULL,
  'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg',
  '{"Switch": "Cherry MX Red", "RGB": "16.8M couleurs", "Matériau": "Aluminium", "Connexion": "USB-C"}'::jsonb,
  42,
  true,
  'clavier-mecanique-rgb-pro'
FROM categories c WHERE c.slug = 'keyboards'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name_fr, name_ar, description_fr, description_ar, price_dzd, image_url, specs, stock, slug)
SELECT 
  c.id,
  'Chaise Gaming Titan X',
  'كرسي ألعاب Titan X',
  'Chaise gaming ergonomique avec support lombaire, accoudoirs 4D, cuir PU premium, RGB intégré.',
  'كرسي ألعاب مريح مع دعم قطني، مساند ذراع 4D، جلد PU فاخر، RGB مدمج.',
  45000.00,
  'https://images.pexels.com/photos/8588732/pexels-photo-8588732.jpeg',
  '{"Matériau": "Cuir PU", "Support": "Lombaire + Nuque", "RGB": "Oui", "Poids max": "150kg"}'::jsonb,
  18,
  'chaise-gaming-titan-x'
FROM categories c WHERE c.slug = 'gaming-chairs'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name_fr, name_ar, description_fr, description_ar, price_dzd, original_price_dzd, image_url, specs, stock, is_flash_sale, flash_sale_end, slug)
SELECT 
  c.id,
  'RTX 4060 Ti Gaming',
  'RTX 4060 Ti للألعاب',
  'Carte graphique NVIDIA RTX 4060 Ti 8GB, Ray Tracing, DLSS 3.0, RGB Fusion.',
  'بطاقة رسومات NVIDIA RTX 4060 Ti 8 جيجا بايت، تتبع الأشعة، DLSS 3.0، RGB Fusion.',
  89000.00,
  105000.00,
  'https://images.pexels.com/photos/7172877/pexels-photo-7172877.jpeg',
  '{"VRAM": "8GB GDDR6", "Ray Tracing": "Oui", "DLSS": "3.0", "TDP": "160W"}'::jsonb,
  25,
  true,
  now() + interval '2 days',
  'rtx-4060-ti-gaming'
FROM categories c WHERE c.slug = 'components'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name_fr, name_ar, description_fr, description_ar, price_dzd, image_url, specs, stock, slug)
SELECT 
  c.id,
  'Casque Gaming 7.1 Surround',
  'سماعة ألعاب 7.1 محيطي',
  'Casque gaming avec son surround 7.1, micro antibruit, RGB synchronisé, coussinets mémoire de forme.',
  'سماعة ألعاب مع صوت محيطي 7.1، ميكروفون مضاد للضوضاء، RGB متزامن، وسائد إسفنج ذاكرة.',
  8500.00,
  'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
  '{"Son": "7.1 Surround", "Micro": "Antibruit", "RGB": "Oui", "Connexion": "USB + Jack 3.5mm"}'::jsonb,
  60,
  'casque-gaming-71-surround'
FROM categories c WHERE c.slug = 'accessories'
ON CONFLICT (slug) DO NOTHING;

-- Insert sample deals
INSERT INTO deals (title_fr, title_ar, description_fr, description_ar, discount_percent, start_date, end_date, is_active) VALUES
  (
    'Méga Soldes Tech',
    'تخفيضات التكنولوجيا الكبرى',
    'Jusqu''à 30% de réduction sur une sélection de produits gaming',
    'خصم يصل إلى 30% على مجموعة مختارة من منتجات الألعاب',
    30,
    now(),
    now() + interval '7 days',
    true
  ),
  (
    'Flash Sale RGB',
    'تخفيضات سريعة RGB',
    'Offres limitées sur les périphériques RGB - Stock limité',
    'عروض محدودة على أجهزة RGB - مخزون محدود',
    25,
    now(),
    now() + interval '3 days',
    true
  )
ON CONFLICT DO NOTHING;