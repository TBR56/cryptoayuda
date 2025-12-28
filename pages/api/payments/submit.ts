import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { email, plan, amount, proofImageBase64 } = req.body;

        // Validate inputs
        if (!email || !plan || !amount || !proofImageBase64) {
            return res.status(400).json({
                message: 'Missing required fields',
                received: {
                    email: !!email,
                    plan: !!plan,
                    amount: !!amount,
                    image: !!proofImageBase64
                }
            });
        }

        // Log to Vercel logs (you can see these in Vercel dashboard)
        console.log('=== NEW PAYMENT SUBMISSION ===');
        console.log('Email:', email);
        console.log('Plan:', plan);
        console.log('Amount:', amount);
        console.log('Image size:', proofImageBase64.length, 'characters');
        console.log('Timestamp:', new Date().toISOString());
        console.log('==============================');

        // Generate payment ID
        const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Return success immediately
        return res.status(200).json({
            success: true,
            message: 'Payment proof submitted successfully',
            paymentId,
            instructions: 'Check your email for confirmation. We will verify your payment within 24 hours.'
        });

    } catch (error: any) {
        console.error('Payment submission error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message || String(error)
        });
    }
}
