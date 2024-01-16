import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_REACT_APP_DATABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_DATABASE_PASSWORD;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
