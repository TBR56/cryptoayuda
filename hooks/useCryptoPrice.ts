import { useState, useEffect } from 'react';

export const useCryptoPrice = () => {
    const [price, setPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await fetch('https://dolarapi.com/v1/dolares/cripto');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setPrice(data.venta);
            } catch (err) {
                console.error("Error fetching crypto price:", err);
                // Fallback constant if API fails (approximate)
                setPrice(1200);
            } finally {
                setLoading(false);
            }
        };

        fetchPrice();
        // Refresh every minute
        const interval = setInterval(fetchPrice, 60000);
        return () => clearInterval(interval);
    }, []);

    return { price, loading };
};
