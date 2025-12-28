import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { email, plan, amount, proofImageBase64 } = req.body;

        if (!email || !plan || !amount || !proofImageBase64) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create payment record with base64 image
        const payment = await prisma.payment.create({
            data: {
                email,
                plan,
                amount: parseFloat(amount),
                proofImageUrl: proofImageBase64, // Store base64 directly
                status: 'pending'
            }
        });

        // TODO: Send notification email to admin
        // You can implement this later with Resend

        return res.status(200).json({
            message: 'Payment proof submitted successfully',
            paymentId: payment.id
        });
    } catch (error) {
        console.error('Payment submission error:', error);
        return res.status(500).json({ message: 'Internal server error', error: String(error) });
    }
}
