'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';
import { FiX, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart, formatPrice } from '../context/CartContext';
import { ORDER_WHATSAPP_NUMBER } from '../lib/site';
import './CartDrawer.css';

function buildOrderMessage(items, total) {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    let msg = "Hi Shizelle! I'd like to order:\n";
    items.forEach((x, i) => {
        msg += `\n${i + 1}) ${x.name}`;
        msg += `\n   Size: ${x.size} | Colour: ${x.color} | Qty: ${x.quantity}`;
        if (x.price) msg += `\n   Price: ${x.price} each`;
        if (origin) msg += `\n   ${origin}/products/${x.productId}`;
        msg += '\n';
    });
    if (total !== null) msg += `\nEstimated total: ${formatPrice(total)}`;
    return msg;
}

function CartDrawer() {
    const pathname = usePathname();
    const { items, count, total, isOpen, closeCart, setQuantity, removeItem, clearCart } = useCart();

    // Close when the page changes
    useEffect(() => {
        closeCart();
    }, [pathname, closeCart]);

    // Esc closes, page behind doesn't scroll
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => e.key === 'Escape' && closeCart();
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [isOpen, closeCart]);

    if (pathname?.startsWith('/admin')) return null;

    const orderLink = `https://wa.me/${ORDER_WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage(items, total))}`;

    return (
        <div className={`cd ${isOpen ? 'cd-open' : ''}`} aria-hidden={!isOpen}>
            <div className="cd-backdrop" onClick={closeCart} />

            <aside className="cd-panel" role="dialog" aria-modal="true" aria-label="Your cart">
                <header className="cd-head">
                    <h2>
                        Your cart {count > 0 && <span className="cd-count">{count}</span>}
                    </h2>
                    <button className="cd-close" onClick={closeCart} aria-label="Close cart">
                        <FiX />
                    </button>
                </header>

                {items.length === 0 ? (
                    <div className="cd-empty">
                        <span className="cd-empty-icon">
                            <FiShoppingBag />
                        </span>
                        <p className="cd-empty-title">Your cart is empty</p>
                        <p>Pick a piece, choose your size and colour, then tap &quot;Add to cart&quot;.</p>
                        <Link href="/products" className="cd-browse" onClick={closeCart}>
                            Browse products
                        </Link>
                    </div>
                ) : (
                    <>
                        <ul className="cd-list">
                            {items.map((x) => (
                                <li key={x.key} className="cd-item">
                                    <Link href={`/products/${x.productId}`} className="cd-thumb" onClick={closeCart}>
                                        {x.image ? <img src={x.image} alt="" /> : <FiShoppingBag />}
                                    </Link>

                                    <div className="cd-info">
                                        <Link href={`/products/${x.productId}`} className="cd-name" onClick={closeCart}>
                                            {x.name}
                                        </Link>
                                        <p className="cd-meta">
                                            {x.size} · {x.color}
                                        </p>
                                        <div className="cd-row">
                                            <div className="cd-qty">
                                                <button onClick={() => setQuantity(x.key, x.quantity - 1)} aria-label="Decrease quantity">
                                                    −
                                                </button>
                                                <span>{x.quantity}</span>
                                                <button onClick={() => setQuantity(x.key, x.quantity + 1)} aria-label="Increase quantity">
                                                    +
                                                </button>
                                            </div>
                                            <span className="cd-price">{x.price}</span>
                                        </div>
                                    </div>

                                    <button className="cd-remove" onClick={() => removeItem(x.key)} aria-label={`Remove ${x.name}`}>
                                        <FiTrash2 />
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <footer className="cd-foot">
                            {total !== null && (
                                <div className="cd-total">
                                    <span>Estimated total</span>
                                    <strong>{formatPrice(total)}</strong>
                                </div>
                            )}
                            <p className="cd-note">We will confirm the final price and delivery on WhatsApp.</p>

                            <a href={orderLink} target="_blank" rel="noopener noreferrer" className="cd-order">
                                <FaWhatsapp /> Order on WhatsApp
                            </a>
                            <button
                                className="cd-clear"
                                onClick={() => {
                                    if (window.confirm('Remove everything from your cart?')) clearCart();
                                }}
                            >
                                Clear cart
                            </button>
                        </footer>
                    </>
                )}
            </aside>
        </div>
    );
}

export default CartDrawer;