/*
  # Create Admin User Setup

  1. Function to promote user to admin
  2. Insert default admin user (optional)
  3. Update profile creation to handle admin role

  Note: After running this migration, you can promote any user to admin
  by updating their role in the profiles table.
*/

-- Function to promote a user to admin role
CREATE OR REPLACE FUNCTION promote_user_to_admin(user_email text)
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET role = 'admin'
  WHERE email = user_email;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with email % not found', user_email;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create admin user if it doesn't exist
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email text,
  admin_password text,
  admin_name text DEFAULT 'Administrator'
)
RETURNS text AS $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Check if user already exists
  IF EXISTS (SELECT 1 FROM profiles WHERE email = admin_email) THEN
    -- Just promote existing user to admin
    PERFORM promote_user_to_admin(admin_email);
    RETURN 'User promoted to admin';
  END IF;
  
  -- Note: In production, you would create the user through Supabase Auth
  -- This is just for demonstration
  RETURN 'Please create user through Supabase Auth first, then promote to admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION promote_user_to_admin(text) TO authenticated;
GRANT EXECUTE ON FUNCTION create_admin_user(text, text, text) TO authenticated;