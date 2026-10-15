import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { api, getApiData } from "../services/api";

const POLLING_INTERVAL = 5000;

export function useOrder({ clearCart }) {
    const [order, setOrder] = useState(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [trackingError, setTrackingError] = useState("");
    const [checkout, setCheckout] = useState(false);

    const orderIdRef = useRef(null);

    const placeOrder = useCallback(
        async (event, customer, entries) => {
            event.preventDefault();

            if (busy) return;

            setBusy(true);
            setError("");

            const payload = {
                customer,
                items: entries.map(({ item, qty }) => ({
                    // Fallback items have local IDs, not database IDs.
                    ...(String(item._id).startsWith("m")
                        ? {}
                        : { menuItem: item._id }),
                    name: item.name,
                    price: item.price,
                    quantity: qty,
                })),
            };

            try {
                const response = await api.post("/orders", payload);
                const createdOrder = getApiData(response);

                setOrder(createdOrder);
                orderIdRef.current = createdOrder?._id ?? null;

                clearCart();
                setCheckout(false);

                return createdOrder;
            } catch (requestError) {
                setError(
                    requestError.response?.data?.message ||
                    requestError.message ||
                    "Could not place your order. Please try again."
                );
                return null;
            } finally {
                setBusy(false);
            }
        },
        [busy, clearCart]
    );

    const dismissOrder = useCallback(() => {
        setOrder(null);
        orderIdRef.current = null;
        setTrackingError("");
    }, []);

    useEffect(() => {
        const orderId = order?._id;

        if (!orderId) return;

        let active = true;
        let timer;

        const refreshOrder = async () => {
            try {
                const response = await api.get(
                    `/orders/${orderId}/track`
                );

                if (active) {
                    setOrder(getApiData(response));
                    setTrackingError("");
                }
            } catch {
                if (active) {
                    setTrackingError(
                        "Unable to refresh order status. Retrying..."
                    );
                }
            }
        };

        timer = setInterval(refreshOrder, POLLING_INTERVAL);

        return () => {
            active = false;
            clearInterval(timer);
        };
    }, [order?._id]);

    return {
        order,
        busy,
        error,
        trackingError,
        checkout,
        setCheckout,
        placeOrder,
        dismissOrder,
    };
}
