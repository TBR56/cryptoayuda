import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { email, plan, amount, proofImageBase64 } = req.body;

        console.log('Received payment submission:', { email, plan, amount, hasImage: !!proofImageBase64 });

        if (!email || !plan || !amount || !proofImageBase64) {
            return res.status(400).json({
                message: 'Missing required fields',
                received: { email: !!email, plan: !!plan, amount: !!amount, image: !!proofImageBase64 }
            });
        }

        // Create payment record with base64 image
        console.log('Creating payment record...');
        const payment = await prisma.payment.create({
            data: {
                email,
                plan,
                amount: parseFloat(amount),
                proofImageUrl: proofImageBase64, // Store base64 directly
                status: 'pending'
            }
        });

        console.log('Payment created successfully:', payment.id);

        return res.status(200).json({
            message: 'Payment proof submitted successfully',
            paymentId: payment.id
        });
    } catch (error: any) {
        console.error('Payment submission error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message || String(error),
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
