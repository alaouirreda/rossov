export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  role: 'member' | 'admin';
  charter_accepted: boolean;
  charter_accepted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MembershipTier {
  id: string;
  name_en: string;
  name_fr: string;
  name_ar: string;
  description_en?: string;
  description_fr?: string;
  description_ar?: string;
  price: number;
  currency: string;
  features_en?: string[];
  features_fr?: string[];
  features_ar?: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Membership {
  id: string;
  user_id: string;
  tier_id: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  start_date?: string;
  end_date?: string;
  auto_renew: boolean;
  payment_method?: string;
  created_at: string;
  updated_at: string;
  tier?: MembershipTier;
}

export interface Product {
  id: string;
  name_en: string;
  name_fr: string;
  name_ar: string;
  description_en?: string;
  description_fr?: string;
  description_ar?: string;
  price: number;
  original_price?: number;
  currency: string;
  stock_quantity: number;
  category_en?: string;
  category_fr?: string;
  category_ar?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  total_amount: number;
  currency: string;
  payment_method?: string;
  payment_id?: string;
  shipping_address?: string;
  billing_address?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  membership_tier_id?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
  product?: Product;
  membership_tier?: MembershipTier;
}

export interface Invoice {
  id: string;
  order_id: string;
  user_id: string;
  invoice_number: string;
  issue_date: string;
  due_date?: string;
  total_amount: number;
  currency: string;
  status: string;
  pdf_url?: string;
  created_at: string;
}

export interface CMSContent {
  id: string;
  page_key: string;
  title_en?: string;
  title_fr?: string;
  title_ar?: string;
  content_en?: string;
  content_fr?: string;
  content_ar?: string;
  meta_description_en?: string;
  meta_description_fr?: string;
  meta_description_ar?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsPost {
  id: string;
  title_en: string;
  title_fr: string;
  title_ar: string;
  excerpt_en?: string;
  excerpt_fr?: string;
  excerpt_ar?: string;
  content_en?: string;
  content_fr?: string;
  content_ar?: string;
  category_en?: string;
  category_fr?: string;
  category_ar?: string;
  featured_image_url?: string;
  is_featured: boolean;
  is_published: boolean;
  read_time: number;
  author_id?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title_en: string;
  title_fr: string;
  title_ar: string;
  description_en?: string;
  description_fr?: string;
  description_ar?: string;
  media_url: string;
  thumbnail_url?: string;
  media_type: 'image' | 'video';
  category_en?: string;
  category_fr?: string;
  category_ar?: string;
  duration?: string;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SupporterCharter {
  id: string;
  version: string;
  title_en: string;
  title_fr: string;
  title_ar: string;
  content_en: string;
  content_fr: string;
  content_ar: string;
  is_active: boolean;
  effective_date: string;
  created_at: string;
}

export interface CharterAcceptance {
  id: string;
  user_id: string;
  charter_id: string;
  accepted_at: string;
  ip_address?: string;
  user_agent?: string;
}