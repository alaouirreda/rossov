/*
  # Fix RLS Infinite Recursion Error

  1. Problem
    - RLS policies on profiles table are causing infinite recursion
    - Policies try to query profiles table from within profiles table policies

  2. Solution
    - Create a SECURITY DEFINER function to check admin status
    - Update all policies to use this function instead of direct queries
    - This bypasses RLS when checking admin status
*/

-- Create a security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- Drop existing policies that cause recursion
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can manage membership tiers" ON membership_tiers;
DROP POLICY IF EXISTS "Admins can read all memberships" ON memberships;
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Admins can read all orders" ON orders;
DROP POLICY IF EXISTS "Admins can read all invoices" ON invoices;
DROP POLICY IF EXISTS "Admins can manage CMS content" ON cms_content;
DROP POLICY IF EXISTS "Admins can manage news posts" ON news_posts;
DROP POLICY IF EXISTS "Admins can manage gallery items" ON gallery_items;
DROP POLICY IF EXISTS "Admins can manage charter" ON supporter_charter;

-- Recreate policies using the is_admin() function
CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage membership tiers"
  ON membership_tiers
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can read all memberships"
  ON memberships
  FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can read all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can read all invoices"
  ON invoices
  FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage CMS content"
  ON cms_content
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage news posts"
  ON news_posts
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage gallery items"
  ON gallery_items
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can manage charter"
  ON supporter_charter
  FOR ALL
  TO authenticated
  USING (is_admin());