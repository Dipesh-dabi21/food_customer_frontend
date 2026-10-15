import { useCallback, useMemo, useState } from "react";

export function useCart() {
    const [cart, setCart] = useState({});

    const addItem = useCallback((item) => {
        setCart((current) => {
            const existing = current[item._id];

            return {
                ...current,
                [item._id]: {
                    item,
                    qty: (existing?.qty || 0) + 1,
                },
            };
        });
    }, []);

    const removeItem = useCallback((itemId) => {
        setCart((current) => {
            const next = { ...current };
            const existing = next[itemId];

            if (!existing) return current;

            if (existing.qty <= 1) {
                delete next[itemId];
            } else {
                next[itemId] = {
                    ...existing,
                    qty: existing.qty - 1,
                };
            }

            return next;
        });
    }, []);

    const clearCart = useCallback(() => {
        setCart({});
    }, []);

    const entries = useMemo(
        () => Object.values(cart),
        [cart]
    );

    const total = useMemo(
        () =>
            entries.reduce(
                (sum, { item, qty }) => sum + item.price * qty,
                0
            ),
        [entries]
    );

    const count = useMemo(
        () => entries.reduce((sum, entry) => sum + entry.qty, 0),
        [entries]
    );

    return {
        cart,
        entries,
        total,
        count,
        addItem,
        removeItem,
        clearCart,
    };
}
