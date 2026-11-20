'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'shizelle-cart-v1';
const CartContext = createContext(null);

// "Rs. 2,500" → 2500 (null if there is no number)
export const parsePrice = (text) => {
    const match = String(text || '').replace(/,/g, '').match(/\d+(\.\d+)?/);
    const n = match ? Number(match[0]) : NaN;
    return Number.isFinite(n) && n > 0 ? n : null;
};

export const formatPrice = (n) => `Rs. ${Math.round(n).toLocaleString('en-US')}`;

// The same product + size + colour is one line in the cart
const lineKey = (item) => `${item.productId}|${item.size}|${item.color}`;

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // Load the saved cart once (it stays after refreshing or closing the tab)
    useEffect(() => {
        try {
            const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
            if (Array.isArray(saved)) setItems(saved.filter((x) => x && x.productId && x.quantity > 0));
        } catch {
            // ignore a broken or blocked storage
        }
        setLoaded(true);
    }, []);

    // Save after every change
    useEffect(() => {
        if (!loaded) return;
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            // storage can be full or blocked: the cart still works for this visit
        }
    }, [items, loaded]);

    const addItem = useCallback((item) => {
        const key = lineKey(item);
        setItems((prev) => {
            const existing = prev.find((x) => lineKey(x) === key);
            if (existing) {
                return prev.map((x) => (lineKey(x) === key ? { ...x, quantity: x.quantity + item.quantity } : x));
            }
            return [...prev, { ...item, key }];
        });
    }, []);

    const setQuantity = useCallback((key, quantity) => {
        setItems((prev) =>
            quantity < 1 ? prev.filter((x) => x.key !== key) : prev.map((x) => (x.key === key ? { ...x, quantity } : x))
        );
    }, []);

    const removeItem = useCallback((key) => setItems((prev) => prev.filter((x) => x.key !== key)), []);
    const clearCart = useCallback(() => setItems([]), []);
    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);

    const value = useMemo(() => {
        const count = items.reduce((sum, x) => sum + x.quantity, 0);
        // Only show a total when every price can be read as a number
        const prices = items.map((x) => parsePrice(x.price));
        const total = prices.every((p) => p !== null)
            ? items.reduce((sum, x, i) => sum + prices[i] * x.quantity, 0)
            : null;
        return { items, count, total, isOpen, addItem, setQuantity, removeItem, clearCart, openCart, closeCart };
    }, [items, isOpen, addItem, setQuantity, removeItem, clearCart, openCart, closeCart]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
    return ctx;
}