import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://abcd1234.supabase.co';
const supabaseAnonKey = 'YOUR_ANON_KEY';

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);
