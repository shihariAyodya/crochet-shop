'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getSupabaseBrowser } from '../lib/supabase/client';

// Only used to show a friendly message. The real protection is the
// Row Level Security rules in Supabase (see supabase/001_setup.sql).
const ADMIN_EMAIL = 'shihariayodya@gmail.com';
const BUCKET = 'product-images';

const cx = (...c) => c.filter(Boolean).join(' ');

/* ── Shared styles ─────────────────────────────────────────── */
const card = 'rounded-2xl border border-black/5 bg-white p-5 shadow-[0_4px_18px_rgba(59,53,50,0.06)] sm:p-6';
const label = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-charcoal/60';
const input =
  'w-full rounded-xl border-[1.5px] border-[#ece4de] bg-[#faf6f2] px-3.5 py-2.5 text-[15px] text-charcoal outline-none transition focus:border-rose focus:bg-white';
const btn = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50';
const btnPrimary = cx(btn, 'bg-rose-dark text-white hover:bg-[#94505c]');
const btnGhost = cx(btn, 'border-[1.5px] border-[#e5ddd7] bg-white text-charcoal hover:border-charcoal/30');
const btnDanger = cx(btn, 'border-[1.5px] border-[#f2c9cd] bg-white text-[#a5363f] hover:bg-[#fdecee]');

/* ════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════ */
export default function Admin() {
  const supabase = getSupabaseBrowser();
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  const logout = () => supabase.auth.signOut();

  return (
    <main className="min-h-screen bg-cream px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-[1100px]">
        {checking ? (
          <p className="py-20 text-center text-charcoal/60">Loading…</p>
        ) : !session ? (
          <LoginForm />
        ) : session.user.email?.toLowerCase() !== ADMIN_EMAIL ? (
          <div className={cx(card, 'mx-auto max-w-md text-center')}>
            <h1 className="mt-0 mb-2 text-2xl font-bold">No access</h1>
            <p className="mb-5 text-charcoal/70">
              You're signed in as {session.user.email}, which isn't the admin account.
            </p>
            <button className={btnGhost} onClick={logout}>Sign out</button>
          </div>
        ) : (
          <Dashboard email={session.user.email} onLogout={logout} />
        )}
      </div>
    </main>
  );
}

/* ── Login ─────────────────────────────────────────────────── */
function LoginForm() {
  const supabase = getSupabaseBrowser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error: loginError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (loginError) setError(loginError.message);
  };

  return (
    <form onSubmit={submit} className={cx(card, 'mx-auto mt-6 max-w-sm')}>
      <span className="text-xs font-bold uppercase tracking-[2.5px] text-sage-dark">Shizelle</span>
      <h1 className="mt-1 mb-6 text-3xl font-bold tracking-tight">Admin login</h1>

      <label className={label} htmlFor="admin-email">Email</label>
      <input id="admin-email" className={cx(input, 'mb-4')} type="email" autoComplete="email"
        value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label className={label} htmlFor="admin-password">Password</label>
      <input id="admin-password" className={cx(input, 'mb-5')} type="password" autoComplete="current-password"
        value={password} onChange={(e) => setPassword(e.target.value)} required />

      {error && <p className="mb-4 rounded-lg bg-[#fdecee] px-3 py-2 text-sm text-[#a5363f]">{error}</p>}

      <button className={cx(btnPrimary, 'w-full py-3')} disabled={busy}>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}

/* ── Dashboard ─────────────────────────────────────────────── */
function Dashboard({ email, onLogout }) {
  const [tab, setTab] = useState('products');

  return (
    <>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[2.5px] text-sage-dark">Shizelle admin</span>
          <h1 className="m-0 text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-charcoal/60">
          <span className="hidden sm:inline">{email}</span>
          <Link href="/" className={btnGhost} target="_blank">View shop ↗</Link>
          <button className={btnGhost} onClick={onLogout}>Sign out</button>
        </div>
      </header>

      <div className="mb-6 inline-flex rounded-xl bg-white p-1 shadow-sm">
        {[
          ['products', 'Products'],
          ['feedback', 'Feedback'],
        ].map(([key, text]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cx(
              'rounded-lg px-5 py-2 text-sm font-bold transition',
              tab === key ? 'bg-charcoal text-white' : 'text-charcoal/60 hover:text-charcoal'
            )}
          >
            {text}
          </button>
        ))}
      </div>

      {tab === 'products' ? <ProductsTab /> : <FeedbackTab />}
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   PRODUCTS
   ════════════════════════════════════════════════════════════ */
function ProductsTab() {
  const supabase = getSupabaseBrowser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | 'new' | product row

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: loadError } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('id', { ascending: true });
    setLoading(false);
    if (loadError) setError(loadError.message);
    else setProducts(data);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products]
  );

  const toggleActive = async (p) => {
    const { error: e } = await supabase.from('products').update({ is_active: !p.is_active }).eq('id', p.id);
    if (e) alert(e.message);
    else load();
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.name}"? This can't be undone.`)) return;
    const { error: e } = await supabase.from('products').delete().eq('id', p.id);
    if (e) alert(e.message);
    else load();
  };

  if (editing) {
    return (
      <ProductForm
        initial={editing === 'new' ? null : editing}
        categories={categories}
        nextSortOrder={products.reduce((m, p) => Math.max(m, p.sort_order || 0), 0) + 1}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          load();
        }}
      />
    );
  }

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 text-charcoal/60">
          {loading ? 'Loading…' : `${products.length} product${products.length === 1 ? '' : 's'}`}
        </p>
        <button className={btnPrimary} onClick={() => setEditing('new')}>+ Add product</button>
      </div>

      {error && <p className="mb-4 rounded-lg bg-[#fdecee] px-3 py-2 text-sm text-[#a5363f]">{error}</p>}

      <div className="grid gap-3">
        {products.map((p) => (
          <div key={p.id} className={cx(card, 'flex flex-wrap items-center gap-4 p-4 sm:p-4', !p.is_active && 'opacity-60')}>
            <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-sage-light">
              {p.images?.[0] ? (
                <img src={p.images[0]} alt="" className="size-full object-cover" />
              ) : (
                <span className="flex size-full items-center justify-center text-2xl">🧶</span>
              )}
            </div>

            <div className="min-w-[180px] flex-1">
              <p className="m-0 text-[11px] font-bold uppercase tracking-wider text-sage-dark">{p.category}</p>
              <p className="m-0 font-bold">{p.name}</p>
              <p className="m-0 text-sm text-rose-dark">
                {p.prices && Object.keys(p.prices).length
                  ? `From ${Object.values(p.prices)[0]}`
                  : p.price || 'No price'}
                <span className="text-charcoal/50">
                  {' · '}{p.images?.length || 0} photo{p.images?.length === 1 ? '' : 's'}
                  {' · '}{p.colors?.length || 0} colour{p.colors?.length === 1 ? '' : 's'}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className={btnGhost} onClick={() => toggleActive(p)} title="Show or hide in the shop">
                {p.is_active ? '👁 Visible' : '🚫 Hidden'}
              </button>
              <button className={btnGhost} onClick={() => setEditing(p)}>Edit</button>
              <button className={btnDanger} onClick={() => remove(p)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Add / edit form ───────────────────────────────────────── */
const toHexText = (hex) => (Array.isArray(hex) ? hex.join(', ') : hex || '#c98a94');
const parseHex = (text) => {
  const parts = text.split(',').map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) return '#cccccc';
  return parts.length === 1 ? parts[0] : parts;
};
const firstHex = (text) => {
  const first = text.split(',')[0]?.trim();
  return /^#[0-9a-f]{6}$/i.test(first) ? first : '#cccccc';
};

function ProductForm({ initial, categories, nextSortOrder, onCancel, onSaved }) {
  const supabase = getSupabaseBrowser();
  const isEdit = Boolean(initial);
  const hasSizePrices = Boolean(initial?.prices && Object.keys(initial.prices).length);

  const [name, setName] = useState(initial?.name || '');
  const [category, setCategory] = useState(initial?.category || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [pricing, setPricing] = useState(hasSizePrices ? 'perSize' : 'single');
  const [price, setPrice] = useState(initial?.price || 'Rs. ');
  const [prices, setPrices] = useState(initial?.prices || {});
  const [sizesText, setSizesText] = useState((initial?.sizes || ['S', 'M', 'L']).join(', '));
  const [colors, setColors] = useState(
    (initial?.colors || []).map((c) => ({
      name: c.name || '',
      hexText: toHexText(c.hex),
      available: c.available !== false,
      imageIndex: typeof c.imageIndex === 'number' ? c.imageIndex : '',
    }))
  );
  const [images, setImages] = useState(initial?.images || []);
  const [isActive, setIsActive] = useState(initial?.is_active ?? true);
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? nextSortOrder);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const sizes = sizesText.split(',').map((s) => s.trim()).filter(Boolean);

  /* Images */
  const uploadFiles = async (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    setUploading(true);
    setError('');
    const uploaded = [];
    for (const file of files) {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upError } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: '31536000',
        contentType: file.type || undefined,
      });
      if (upError) {
        setError(`Upload failed for ${file.name}: ${upError.message}`);
        continue;
      }
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }
    setImages((prev) => [...prev, ...uploaded]);
    setUploading(false);
  };

  // Keep each colour's photo link pointing at the same photo after moving/removing photos
  const remapColorPhotos = (mapFn) =>
    setColors((prev) =>
      prev.map((c) => {
        if (c.imageIndex === '') return c;
        const next = mapFn(Number(c.imageIndex));
        return { ...c, imageIndex: next === null ? '' : next };
      })
    );

  const moveImage = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= images.length) return;
    setImages((prev) => {
      const copy = [...prev];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
    remapColorPhotos((idx) => (idx === i ? j : idx === j ? i : idx));
  };

  const removeImage = (i) => {
    setImages((prev) => prev.filter((_, k) => k !== i));
    remapColorPhotos((idx) => (idx === i ? null : idx > i ? idx - 1 : idx));
  };

  /* Colours */
  const updateColor = (i, patch) =>
    setColors((prev) => prev.map((c, k) => (k === i ? { ...c, ...patch } : c)));
  const addColor = () =>
    setColors((prev) => [...prev, { name: '', hexText: '#c98a94', available: true, imageIndex: '' }]);
  const removeColor = (i) => setColors((prev) => prev.filter((_, k) => k !== i));

  /* Save */
  const save = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !category.trim()) return setError('Please add a name and a category.');
    if (sizes.length === 0) return setError('Please add at least one size.');
    if (colors.length === 0) return setError('Please add at least one colour.');
    if (colors.some((c) => !c.name.trim())) return setError('Every colour needs a name.');

    let priceValue = null;
    let pricesValue = null;
    if (pricing === 'single') {
      if (!price.trim() || price.trim() === 'Rs.') return setError('Please add a price.');
      priceValue = price.trim();
    } else {
      pricesValue = {};
      for (const s of sizes) {
        const v = (prices[s] || '').trim();
        if (!v || v === 'Rs.') return setError(`Please add a price for size ${s}.`);
        pricesValue[s] = v;
      }
    }

    const payload = {
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      price: priceValue,
      prices: pricesValue,
      sizes,
      colors: colors.map((c) => {
        const out = { name: c.name.trim(), hex: parseHex(c.hexText), available: c.available };
        if (c.imageIndex !== '' && Number(c.imageIndex) < images.length) out.imageIndex = Number(c.imageIndex);
        return out;
      }),
      images,
      is_active: isActive,
      sort_order: Number(sortOrder) || 0,
    };

    setSaving(true);
    const query = isEdit
      ? supabase.from('products').update(payload).eq('id', initial.id)
      : supabase.from('products').insert(payload);
    const { error: saveError } = await query;
    setSaving(false);

    if (saveError) setError(saveError.message);
    else onSaved();
  };

  return (
    <form onSubmit={save} className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 text-2xl font-bold">{isEdit ? `Edit: ${initial.name}` : 'New product'}</h2>
        <button type="button" className={btnGhost} onClick={onCancel}>← Back to list</button>
      </div>

      {/* Basics */}
      <div className={card}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="p-name">Name</label>
            <input id="p-name" className={input} value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className={label} htmlFor="p-category">Category</label>
            <input id="p-category" className={input} list="category-list" value={category}
              onChange={(e) => setCategory(e.target.value)} placeholder="e.g. CropTops" required />
            <datalist id="category-list">
              {categories.map((c) => <option key={c} value={c} />)}
            </datalist>
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="p-desc">Description</label>
            <textarea id="p-desc" className={cx(input, 'min-h-24 resize-y')} value={description}
              onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="p-sizes">Sizes (comma separated)</label>
            <input id="p-sizes" className={input} value={sizesText} onChange={(e) => setSizesText(e.target.value)}
              placeholder="XS, S, M, L, XL" />
          </div>
          <div className="flex items-end gap-6">
            <div className="w-28">
              <label className={label} htmlFor="p-order">Order</label>
              <input id="p-order" className={input} type="number" value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)} />
            </div>
            <label className="mb-3 flex cursor-pointer items-center gap-2 text-sm font-semibold">
              <input type="checkbox" className="size-4 accent-[#a5636f]" checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)} />
              Visible in shop
            </label>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className={card}>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className={cx(label, 'mb-0 mr-2')}>Price</span>
          {[
            ['single', 'Same price for all sizes'],
            ['perSize', 'Different price per size'],
          ].map(([key, text]) => (
            <button key={key} type="button" onClick={() => setPricing(key)}
              className={cx('rounded-full border-[1.5px] px-4 py-1.5 text-sm font-semibold transition',
                pricing === key ? 'border-charcoal bg-charcoal text-white' : 'border-[#e5ddd7] bg-white')}>
              {text}
            </button>
          ))}
        </div>

        {pricing === 'single' ? (
          <input className={cx(input, 'max-w-xs')} value={price} onChange={(e) => setPrice(e.target.value)}
            placeholder="Rs. 2,500" />
        ) : sizes.length === 0 ? (
          <p className="m-0 text-sm text-charcoal/60">Add sizes above first.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {sizes.map((s) => (
              <div key={s}>
                <label className={label}>{s}</label>
                <input className={input} value={prices[s] ?? 'Rs. '}
                  onChange={(e) => setPrices((prev) => ({ ...prev, [s]: e.target.value }))} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Photos */}
      <div className={card}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className={cx(label, 'mb-0')}>Photos ({images.length}) · first photo is the main one</span>
          <label className={cx(btnPrimary, 'cursor-pointer', uploading && 'pointer-events-none opacity-60')}>
            {uploading ? 'Uploading…' : '+ Upload photos'}
            <input type="file" accept="image/*" multiple className="hidden"
              onChange={(e) => { uploadFiles(e.target.files); e.target.value = ''; }} />
          </label>
        </div>

        {images.length === 0 ? (
          <p className="m-0 text-sm text-charcoal/60">No photos yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {images.map((url, i) => (
              <div key={`${url}-${i}`} className="overflow-hidden rounded-xl border border-black/5 bg-[#faf6f2]">
                <div className="relative aspect-square">
                  <img src={url} alt="" className="size-full object-cover" />
                  <span className="absolute top-1.5 left-1.5 rounded-full bg-black/55 px-2 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <div className="flex justify-between p-1.5">
                  <button type="button" className="px-2 text-lg disabled:opacity-30" onClick={() => moveImage(i, -1)}
                    disabled={i === 0} aria-label="Move left">‹</button>
                  <button type="button" className="px-2 text-sm text-[#a5363f]" onClick={() => removeImage(i)}>
                    Remove
                  </button>
                  <button type="button" className="px-2 text-lg disabled:opacity-30" onClick={() => moveImage(i, 1)}
                    disabled={i === images.length - 1} aria-label="Move right">›</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Colours */}
      <div className={card}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className={cx(label, 'mb-0')}>Colours</span>
          <button type="button" className={btnGhost} onClick={addColor}>+ Add colour</button>
        </div>
        <p className="mt-0 mb-4 text-sm text-charcoal/60">
          For two-tone colours, type two codes separated by a comma, e.g. <code>#c98a94, #ffffff</code>.
        </p>

        <div className="grid gap-3">
          {colors.map((c, i) => (
            <div key={i} className="flex flex-wrap items-center gap-3 rounded-xl bg-[#faf6f2] p-3">
              <input type="color" className="h-10 w-12 cursor-pointer rounded-lg border-0 bg-transparent"
                value={firstHex(c.hexText)}
                onChange={(e) => {
                  const rest = c.hexText.split(',').slice(1).map((s) => s.trim()).filter(Boolean);
                  updateColor(i, { hexText: [e.target.value, ...rest].join(', ') });
                }}
                aria-label="Pick colour" />
              <input className={cx(input, 'w-36 bg-white')} value={c.hexText}
                onChange={(e) => updateColor(i, { hexText: e.target.value })} aria-label="Colour code" />
              <input className={cx(input, 'min-w-[140px] flex-1 bg-white')} value={c.name}
                onChange={(e) => updateColor(i, { name: e.target.value })} placeholder="Colour name" />
              <select className={cx(input, 'w-auto bg-white')} value={c.imageIndex}
                onChange={(e) => updateColor(i, { imageIndex: e.target.value === '' ? '' : Number(e.target.value) })}
                aria-label="Photo for this colour">
                <option value="">No photo</option>
                {images.map((_, k) => <option key={k} value={k}>Photo {k + 1}</option>)}
              </select>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
                <input type="checkbox" className="size-4 accent-[#718c5a]" checked={c.available}
                  onChange={(e) => updateColor(i, { available: e.target.checked })} />
                In stock
              </label>
              <button type="button" className="ml-auto px-2 text-sm text-[#a5363f]" onClick={() => removeColor(i)}>
                Remove
              </button>
            </div>
          ))}
          {colors.length === 0 && <p className="m-0 text-sm text-charcoal/60">No colours yet.</p>}
        </div>
      </div>

      {error && <p className="m-0 rounded-lg bg-[#fdecee] px-4 py-3 text-sm text-[#a5363f]">{error}</p>}

      <div className="flex flex-wrap justify-end gap-3 pb-10">
        <button type="button" className={btnGhost} onClick={onCancel}>Cancel</button>
        <button className={cx(btnPrimary, 'px-8')} disabled={saving || uploading}>
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Add product'}
        </button>
      </div>
    </form>
  );
}

/* ════════════════════════════════════════════════════════════
   FEEDBACK
   ════════════════════════════════════════════════════════════ */
function FeedbackTab() {
  const supabase = getSupabaseBrowser();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: loadError } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });
    setLoading(false);
    if (loadError) setError(loadError.message);
    else setItems(data);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id) => {
    if (!window.confirm('Delete this feedback?')) return;
    const { error: e } = await supabase.from('feedback').delete().eq('id', id);
    if (e) alert(e.message);
    else load();
  };

  return (
    <section>
      <p className="mt-0 mb-4 text-charcoal/60">
        {loading ? 'Loading…' : `${items.length} message${items.length === 1 ? '' : 's'}`}
      </p>
      {error && <p className="mb-4 rounded-lg bg-[#fdecee] px-3 py-2 text-sm text-[#a5363f]">{error}</p>}

      <div className="grid gap-3">
        {items.map((f) => (
          <div key={f.id} className={card}>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <p className="m-0 font-bold">
                {f.name}
                {f.rating ? <span className="ml-2 text-[#f4b740]">{'★'.repeat(f.rating)}</span> : null}
              </p>
              <span className="text-xs text-charcoal/50">{new Date(f.created_at).toLocaleString()}</span>
            </div>
            <p className="mt-0 mb-3 whitespace-pre-wrap text-charcoal/80">{f.message}</p>
            <button className={btnDanger} onClick={() => remove(f.id)}>Delete</button>
          </div>
        ))}
        {!loading && items.length === 0 && <p className="m-0 text-charcoal/60">No feedback yet.</p>}
      </div>
    </section>
  );
}
