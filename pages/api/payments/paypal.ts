import type { NextApiRequest, NextApiResponse } from 'next';

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API = process.env.NODE_ENV === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        console.error("PayPal Error: Missing credentials in environment variables.");
        throw new Error("Missing PayPal credentials");
    }
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
    const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.text();
        console.error("PayPal Auth Error:", errorData);
        throw new Error("Failed to authenticate with PayPal");
    }

    const data = await response.json();
    return data.access_token;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    try {
        const { plan, amount } = req.body;

        if (!amount || isNaN(Number(amount))) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        const accessToken = await getAccessToken();

        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        reference_id: plan,
                        amount: {
                            currency_code: "USD",
                            value: Number(amount).toFixed(2),
                        },
                        description: `Inscripción CryptoAyuda - Plan ${plan}`,
                    },
                ],
            }),
        });

        const order = await response.json();
        if (!response.ok) {
            console.error("PayPal Order API Error:", order);
            return res.status(response.status).json({ message: "PayPal API error", details: order });
        }

        return res.status(200).json(order);
    } catch (error: any) {
        console.error("PayPal Order Crash:", error);
        return res.status(500).json({ message: "Internal server error during order creation", error: error.message });
    }
}
