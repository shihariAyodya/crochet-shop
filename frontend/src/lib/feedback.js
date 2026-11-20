import { createClient } from '@supabase/supabase-js';

/**
 * Reads the feedback you switched on in the admin page ("Show on site").
 * Used by the home page on the server. Never breaks the page:
 * if anything goes wrong it just returns an empty list.
 */
export async function getShownFeedback() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return [];

    const supabase = createClient(url, key, { auth: { persistSession: false } });

    const { data, error } = await supabase
        .from('feedback')
        .select('id, name, rating, message, created_at')
        .eq('show_on_site', true)
        .order('created_at', { ascending: false })
        .limit(12);

    if (error) {
        console.error('Could not load feedback from Supabase:', error.message);
        return [];
    }

    return data;
}