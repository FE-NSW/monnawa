import { createClient } from '@supabase/supabase-js';


// 컴포저블 내에서 사용하기
export function useSupabase() {
    const config = useRuntimeConfig(); // setup 내에서 호출해야 함
    const supabaseUrl = config.public.SUPABASE_URL;
    const supabaseKey = config.public.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase URL and key must be provided.');
    }

    return createClient(supabaseUrl, supabaseKey);
}