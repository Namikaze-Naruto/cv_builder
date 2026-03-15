// Supabase client stub.
// To enable cloud sync:
//   1. npm install @supabase/supabase-js
//   2. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file
//   3. Uncomment the import below and remove the stub

// import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Replace `null` with `createClient(url, key)` once the package is installed.
const supabase = (url && key) ? null /* createClient(url, key) */ : null;

export const getSupabase = () => supabase;
export const isSupabaseConfigured = () => Boolean(url && key && supabase);
