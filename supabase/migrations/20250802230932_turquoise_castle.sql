/*
  # Fix Admin Promotion and Verification

  1. Problem
    - Admin promotion might not be working correctly
    - Profile queries might have issues with RLS policies

  2. Solution
    - Ensure promote_user_to_admin function works correctly
    - Add better error handling and logging
    - Verify RLS policies allow proper profile updates
*/

-- Recreate the promote_user_to_admin function with better error handling
CREATE OR REPLACE FUNCTION promote_user_to_admin(user_email text)
RETURNS json AS $$
DECLARE
  user_record profiles%ROWTYPE;
  result json;
BEGIN
  -- Check if user exists
  SELECT * INTO user_record FROM profiles WHERE email = user_email;
  
  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'User with email ' || user_email || ' not found'
    );
  END IF;
  
  -- Update user role to admin
  UPDATE profiles 
  SET role = 'admin'
  WHERE email = user_email;
  
  -- Verify the update worked
  SELECT * INTO user_record FROM profiles WHERE email = user_email;
  
  RETURN json_build_object(
    'success', true,
    'user_id', user_record.id,
    'email', user_record.email,
    'role', user_record.role,
    'message', 'User successfully promoted to admin'
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add a function to check current user's role for debugging
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS json AS $$
DECLARE
  user_record profiles%ROWTYPE;
BEGIN
  SELECT * INTO user_record FROM profiles WHERE id = auth.uid();
  
  IF NOT FOUND THEN
    RETURN json_build_object(
      'found', false,
      'user_id', auth.uid()
    );
  END IF;
  
  RETURN json_build_object(
    'found', true,
    'user_id', user_record.id,
    'email', user_record.email,
    'role', user_record.role,
    'charter_accepted', user_record.charter_accepted
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure profiles can be updated by users themselves
CREATE POLICY "Users can update own role" ON profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION promote_user_to_admin(text) TO authenticated;
GRANT EXECUTE ON FUNCTION get_current_user_role() TO authenticated;