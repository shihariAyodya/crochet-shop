import { createClient } from '@supabase/supabase-js';

// Always run fresh (never cached), so it really talks to the database
export const dynamic = 'force-dynamic';

/**
 * Called once a day by a Vercel cron job (see vercel.json).
 * It counts the products in Supabase. That tiny database query is
 * enough "activity" to stop the free Supabase project from pausing.
 */
export async function GET(request) {
    // Optional protection: if CRON_SECRET is set in Vercel, only Vercel's cron can call this
    const secret = process.env.CRON_SECRET;
    if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
        { auth: { persistSession: false } }
    );

    const { count, error } = await supabase
        .from('products')
        .select('id', { count: 'exact', head: true });

    if (error) {
        console.error('Keep-alive failed:', error.message);
        return Response.json({ ok: false, error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true, products: count, at: new Date().toISOString() });
}