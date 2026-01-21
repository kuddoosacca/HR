import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rolpskghrkvqgantfifx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error("Missing SUPABASE_KEY in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
