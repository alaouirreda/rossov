/*
  # Create Membership Portal Database Schema

  1. New Tables
    - `profiles` - User profile information with multilingual support
    - `membership_tiers` - Dynamic membership tier definitions
    - `memberships` - User membership records
    - `products` - Product catalog with multilingual content
    - `orders` - Purchase orders and history
    - `order_items` - Individual items in orders
    - `invoices` - Invoice generation and tracking
    - `cms_content` - Dynamic content management for About Us, etc.
    - `news_posts` - News and announcements with multilingual support
    - `gallery_items` - Media gallery management
    - `supporter_charter` - Charter content and user agreements

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and admin access
    - Separate admin and member access levels

  3. Features
    - Multilingual content support (en, fr, ar)
    - Dynamic pricing and membership tiers
    - Complete order and invoice management
    - CMS for dynamic content updates
*/

-- Create enum for languages
CREATE TYPE language_code AS ENUM ('en', 'fr', 'ar');

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('member', 'admin');

-- Create enum for membership status
CREATE TYPE membership_status AS ENUM ('active', 'expired', 'cancelled', 'pending');

-- Create enum for order status
CREATE TYPE order_status AS ENUM ('pending', 'completed', 'cancelled', 'refunded');

-- User profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  address text,
  city text,
  country text,
  postal_code text,
  role user_role DEFAULT 'member',
  charter_accepted boolean DEFAULT false,
  charter_accepted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Membership tiers table
CREATE TABLE IF NOT EXISTS membership_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_fr text NOT NULL,
  name_ar text NOT NULL,
  description_en text,
  description_fr text,
  description_ar text,
  price decimal(10,2) NOT NULL,
  currency text DEFAULT 'MAD',
  features_en text[],
  features_fr text[],
  features_ar text[],
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User memberships table
CREATE TABLE IF NOT EXISTS memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  tier_id uuid REFERENCES membership_tiers(id),
  status membership_status DEFAULT 'pending',
  start_date timestamptz,
  end_date timestamptz,
  auto_renew boolean DEFAULT false,
  payment_method text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_fr text NOT NULL,
  name_ar text NOT NULL,
  description_en text,
  description_fr text,
  description_ar text,
  price decimal(10,2) NOT NULL,
  original_price decimal(10,2),
  currency text DEFAULT 'MAD',
  stock_quantity integer DEFAULT 0,
  category_en text,
  category_fr text,
  category_ar text,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status order_status DEFAULT 'pending',
  total_amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'MAD',
  payment_method text,
  payment_id text,
  shipping_address text,
  billing_address text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  membership_tier_id uuid REFERENCES membership_tiers(id),
  quantity integer DEFAULT 1,
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  invoice_number text UNIQUE NOT NULL,
  issue_date timestamptz DEFAULT now(),
  due_date timestamptz,
  total_amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'MAD',
  status text DEFAULT 'issued',
  pdf_url text,
  created_at timestamptz DEFAULT now()
);

-- CMS content table for dynamic content
CREATE TABLE IF NOT EXISTS cms_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text UNIQUE NOT NULL,
  title_en text,
  title_fr text,
  title_ar text,
  content_en text,
  content_fr text,
  content_ar text,
  meta_description_en text,
  meta_description_fr text,
  meta_description_ar text,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- News posts table
CREATE TABLE IF NOT EXISTS news_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_fr text NOT NULL,
  title_ar text NOT NULL,
  excerpt_en text,
  excerpt_fr text,
  excerpt_ar text,
  content_en text,
  content_fr text,
  content_ar text,
  category_en text,
  category_fr text,
  category_ar text,
  featured_image_url text,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  read_time integer DEFAULT 5,
  author_id uuid REFERENCES profiles(id),
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Gallery items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_fr text NOT NULL,
  title_ar text NOT NULL,
  description_en text,
  description_fr text,
  description_ar text,
  media_url text NOT NULL,
  thumbnail_url text,
  media_type text DEFAULT 'image', -- 'image' or 'video'
  category_en text,
  category_fr text,
  category_ar text,
  duration text, -- for videos
  is_featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Supporter charter table
CREATE TABLE IF NOT EXISTS supporter_charter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version text NOT NULL,
  title_en text NOT NULL,
  title_fr text NOT NULL,
  title_ar text NOT NULL,
  content_en text NOT NULL,
  content_fr text NOT NULL,
  content_ar text NOT NULL,
  is_active boolean DEFAULT true,
  effective_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Charter acceptances table
CREATE TABLE IF NOT EXISTS charter_acceptances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  charter_id uuid REFERENCES supporter_charter(id),
  accepted_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE supporter_charter ENABLE ROW LEVEL SECURITY;
ALTER TABLE charter_acceptances ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Membership tiers policies (public read, admin write)
CREATE POLICY "Anyone can read active membership tiers"
  ON membership_tiers
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage membership tiers"
  ON membership_tiers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Memberships policies
CREATE POLICY "Users can read own memberships"
  ON memberships
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can read all memberships"
  ON memberships
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "System can create memberships"
  ON memberships
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can read active products"
  ON products
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Orders policies
CREATE POLICY "Users can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can read all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Order items policies
CREATE POLICY "Users can read own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE id = order_items.order_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for own orders"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE id = order_items.order_id AND user_id = auth.uid()
    )
  );

-- Invoices policies
CREATE POLICY "Users can read own invoices"
  ON invoices
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can read all invoices"
  ON invoices
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- CMS content policies (public read, admin write)
CREATE POLICY "Anyone can read published CMS content"
  ON cms_content
  FOR SELECT
  TO authenticated
  USING (is_published = true);

CREATE POLICY "Admins can manage CMS content"
  ON cms_content
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- News posts policies (public read, admin write)
CREATE POLICY "Anyone can read published news"
  ON news_posts
  FOR SELECT
  TO authenticated
  USING (is_published = true);

CREATE POLICY "Admins can manage news posts"
  ON news_posts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Gallery policies (public read, admin write)
CREATE POLICY "Anyone can read gallery items"
  ON gallery_items
  FOR SELECT
  TO authenticated;

CREATE POLICY "Admins can manage gallery items"
  ON gallery_items
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Charter policies
CREATE POLICY "Anyone can read active charter"
  ON supporter_charter
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage charter"
  ON supporter_charter
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Charter acceptances policies
CREATE POLICY "Users can read own charter acceptances"
  ON charter_acceptances
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create charter acceptances"
  ON charter_acceptances
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_membership_tiers_updated_at
  BEFORE UPDATE ON membership_tiers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_memberships_updated_at
  BEFORE UPDATE ON memberships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_content_updated_at
  BEFORE UPDATE ON cms_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_posts_updated_at
  BEFORE UPDATE ON news_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default membership tiers
INSERT INTO membership_tiers (name_en, name_fr, name_ar, description_en, description_fr, description_ar, price, features_en, features_fr, features_ar, sort_order) VALUES
('Solidarity Rate', 'Tarif Solidaire', 'السعر التضامني', 'Special for students or unemployed', 'Spécial étudiants ou sans emploi', 'خاص بالطلاب أو العاطلين عن العمل', 50.00, 
 ARRAY['Access to community and official information'], 
 ARRAY['Accès à la communauté et informations officielles'], 
 ARRAY['الوصول إلى المجتمع والمعلومات الرسمية'], 1),

('Standard Pack', 'Pack Standard', 'الباقة العادية', 'Subscription only', 'Abonnement seul', 'اشتراك فقط', 100.00,
 ARRAY['Access to community and official information', 'Monthly newsletter'],
 ARRAY['Accès à la communauté et informations officielles', 'Newsletter mensuelle'],
 ARRAY['الوصول إلى المجتمع والمعلومات الرسمية', 'النشرة الشهرية'], 2),

('Premium Pack', 'Pack Premium', 'باقة بريميوم', 'Subscription + Exclusive Product', 'Abonnement + Produit exclusif', 'اشتراك + منتج حصري', 300.00,
 ARRAY['All Standard features', 'Exclusive merchandise', 'Priority event access'],
 ARRAY['Toutes les fonctionnalités Standard', 'Marchandise exclusive', 'Accès prioritaire aux événements'],
 ARRAY['جميع ميزات الباقة العادية', 'منتجات حصرية', 'وصول مميز للفعاليات'], 3),

('Contributor', 'Contributeur', 'داعم', 'For enhanced support', 'Pour un soutien renforcé', 'لدعم معزز', 400.00,
 ARRAY['All Premium features', 'VIP event access', 'Meet & greet opportunities', 'Exclusive products'],
 ARRAY['Toutes les fonctionnalités Premium', 'Accès VIP aux événements', 'Opportunités de rencontres', 'Produits exclusifs'],
 ARRAY['جميع ميزات الباقة المميزة', 'وصول VIP للفعاليات', 'فرص اللقاءات', 'منتجات حصرية'], 4);

-- Insert default products
INSERT INTO products (name_en, name_fr, name_ar, description_en, description_fr, description_ar, price, original_price, stock_quantity, category_en, category_fr, category_ar) VALUES
('Official RossoVerde Jersey', 'Maillot Officiel RossoVerde', 'قميص RossoVerde الرسمي', 'High-quality official jersey with RossoVerde branding', 'Maillot officiel de haute qualité avec marquage RossoVerde', 'قميص رسمي عالي الجودة بشعار RossoVerde', 65.00, 80.00, 45, 'Clothing', 'Vêtements', 'ملابس'),

('Supporters Scarf', 'Écharpe des Supporters', 'وشاح المشجعين', 'Premium supporters scarf in Moroccan colors', 'Écharpe de supporters premium aux couleurs marocaines', 'وشاح مشجعين مميز بالألوان المغربية', 25.00, NULL, 89, 'Accessories', 'Accessoires', 'إكسسوارات'),

('RossoVerde Cap', 'Casquette RossoVerde', 'قبعة RossoVerde', 'Stylish cap with embroidered logo', 'Casquette élégante avec logo brodé', 'قبعة أنيقة بشعار مطرز', 30.00, NULL, 67, 'Accessories', 'Accessoires', 'إكسسوارات'),

('Exclusive Coffee Mug', 'Mug à Café Exclusif', 'كوب القهوة الحصري', 'Limited edition ceramic mug', 'Mug en céramique édition limitée', 'كوب سيراميك إصدار محدود', 20.00, 25.00, 0, 'Home', 'Maison', 'منزلية'),

('Sports Backpack', 'Sac à Dos Sport', 'حقيبة الظهر الرياضية', 'Durable sports backpack with RossoVerde design', 'Sac à dos sport durable avec design RossoVerde', 'حقيبة ظهر رياضية متينة بتصميم RossoVerde', 55.00, NULL, 23, 'Bags', 'Sacs', 'حقائب');

-- Insert default CMS content
INSERT INTO cms_content (page_key, title_en, title_fr, title_ar, content_en, content_fr, content_ar) VALUES
('about_us', 'About RossoVerde', 'À Propos de RossoVerde', 'حول RossoVerde', 
 'RossoVerde is the official supporters association of the Moroccan national team...', 
 'RossoVerde est l''association officielle des supporters de l''équipe nationale marocaine...', 
 'RossoVerde هي جمعية مشجعي المنتخب المغربي الرسمية...');

-- Insert default supporter charter
INSERT INTO supporter_charter (version, title_en, title_fr, title_ar, content_en, content_fr, content_ar) VALUES
('1.0', 'RossoVerde Supporter Charter', 'Charte des Supporters RossoVerde', 'ميثاق مشجعي RossoVerde',
 'By joining RossoVerde, I commit to supporting the Moroccan national team with respect, passion, and fair play...', 
 'En rejoignant RossoVerde, je m''engage à soutenir l''équipe nationale marocaine avec respect, passion et fair-play...', 
 'بانضمامي إلى RossoVerde، أتعهد بدعم المنتخب المغربي بالاحترام والشغف واللعب النظيف...');

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_memberships_user_id ON memberships(user_id);
CREATE INDEX idx_memberships_status ON memberships(status);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_news_posts_published ON news_posts(is_published);
CREATE INDEX idx_gallery_items_category ON gallery_items(category_en);