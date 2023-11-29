import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qknltupitdhaeekvmyuw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrbmx0dXBpdGRoYWVla3ZteXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxNDY0NzcsImV4cCI6MjAxNDcyMjQ3N30.kx1w-swGRdRhUXHTmPRDj8sD4z91DwAv8fdRCpTyxqc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
