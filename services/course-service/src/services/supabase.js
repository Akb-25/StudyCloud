import { createClient } from '@supabase/supabase-js'
import dotenv  from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
// console.log("Supabase URL: ", supabaseUrl);
// console.log("Supabase Key: ", supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);