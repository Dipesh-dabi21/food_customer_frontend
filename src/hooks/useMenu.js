import { useEffect, useState } from "react";
import { api, getApiData } from "../services/api";
import { fallbackMenu } from "../data/fallbackMenu";

export function useMenu() {
    const [menu, setMenu] = useState(fallbackMenu);
    const [loading, setLoading] = useState(true);
    const [menuError, setMenuError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMenu() {
            try {
                const response = await api.get("/menu", {
                    signal: controller.signal,
                });

                const data = getApiData(response);

                if (Array.isArray(data) && data.length > 0) {
                    setMenu(data);
                }
            } catch (error) {
                if (
                    error.code !== "ERR_CANCELED" &&
                    error.name !== "CanceledError"
                ) {
                    setMenuError(
                        "Could not load the live menu. Showing available sample items."
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchMenu();

        return () => controller.abort();
    }, []);

    return { menu, loading, menuError };
}
