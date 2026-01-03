import type { NextApiRequest, NextApiResponse } from 'next';
import { processSuccessfulPayment } from '../../../lib/paymentUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const event = req.body;

    // 1. Handle PayPal Webhooks
    if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
        const resource = event.resource;
        const email = resource.payer?.email_address || event.summary?.split('from ')[1];
        const amount = resource.amount?.value || 0;
        const plan = resource.custom_id || event.resource.purchase_units?.[0]?.reference_id || 'base';

        try {
            await processSuccessfulPayment(email, plan, amount, `paypal_${resource.id}`, 'approved');
            return res.status(200).json({ success: true });
        } catch (err) {
            console.error('[PayPal Webhook Error]:', err);
            return res.status(500).json({ success: false });
        }
    }

    // 2. Generic Fallback
    const { email, plan, amount, txHash } = req.body;
    if (email && plan) {
        try {
            await processSuccessfulPayment(email, plan, amount || 0, txHash || `webhook_${Date.now()}`, 'approved');
            return res.status(200).json({ success: true });
        } catch (err) {
            console.error('[Webhook Fallback Error]:', err);
            return res.status(500).json({ success: false });
        }
    }

    return res.status(400).json({ message: 'Unknown notification format' });
}
