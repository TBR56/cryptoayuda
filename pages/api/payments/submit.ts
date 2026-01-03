import type { NextApiRequest, NextApiResponse } from 'next';
import { processSuccessfulPayment } from '../../../lib/paymentUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { email, plan, amount, method, txHash, metadata } = req.body;

        if (!email || !plan || !amount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // For PayPal captured on client-side, we mark as approved immediately
        // For Crypto, we mark as pending for manual verification
        const status = (method === 'paypal') ? 'approved' : 'pending';

        const result = await processSuccessfulPayment(
            email,
            plan,
            amount,
            txHash || `client_${Date.now()}`,
            status
        );

        return res.status(200).json({
            success: true,
            paymentId: result.payment.id,
            message: status === 'approved' ? 'Payment processed and account active.' : 'Payment registered and pending verification.'
        });

    } catch (error: any) {
        console.error("Payment Submission Error:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}
