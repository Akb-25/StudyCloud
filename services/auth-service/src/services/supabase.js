import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

// dotenv.config({ path:"../../.env" });
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseKey ? '***' : 'Not set');
export const supabase = createClient(supabaseUrl, supabaseKey,{
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});