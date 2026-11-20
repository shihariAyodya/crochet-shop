import { createClient } from '@supabase/supabase-js';

/**
 * Reads products from Supabase on the server.
 * Used by the pages in /app to load products before the page is sent to the browser.
 */
function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to frontend/.env.local'
    );
  }

  return createClient(url, key, { auth: { persistSession: false } });
}

/** Turns a database row into the product shape the components expect. */
export function normalizeProduct(row) {
  const prices = row.prices && Object.keys(row.prices).length > 0 ? row.prices : null;

  return {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description || '',
    price: prices ? null : row.price || null,
    prices,
    sizes: Array.isArray(row.sizes) ? row.sizes : [],
    colors: Array.isArray(row.colors) ? row.colors : [],
    images: Array.isArray(row.images) ? row.images : [],
  };
}

/** All products that are visible in the shop, in display order. */
export async function getProducts() {
  const { data, error } = await getClient()
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true });

  if (error) {
    console.error('Could not load products from Supabase:', error.message);
    return [];
  }

  return data.map(normalizeProduct);
}

/** One product by id, or null if it doesn't exist / is hidden. */
export async function getProduct(id) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) return null;

  const { data, error } = await getClient()
    .from('products')
    .select('*')
    .eq('id', numericId)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('Could not load product from Supabase:', error.message);
    return null;
  }

  return data ? normalizeProduct(data) : null;
}
