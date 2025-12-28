import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

interface Payment {
    id: string;
    email: string;
    plan: string;
    amount: number;
    proofImageUrl: string;
    status: string;
    createdAt: string;
}

const PAYMENTS_FILE = path.join('/tmp', 'payments.json');

async function getPayments(): Promise<Payment[]> {
    try {
        const data = await fs.readFile(PAYMENTS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function savePayments(payments: Payment[]) {
    await fs.writeFile(PAYMENTS_FILE, JSON.stringify(payments, null, 2));
}

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

        // Create payment record
        const payments = await getPayments();
        const newPayment: Payment = {
            id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            email,
            plan,
            amount: parseFloat(amount),
            proofImageUrl: proofImageBase64,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        payments.push(newPayment);
        await savePayments(payments);

        console.log('Payment created successfully:', newPayment.id);

        return res.status(200).json({
            message: 'Payment proof submitted successfully',
            paymentId: newPayment.id
        });
    } catch (error: any) {
        console.error('Payment submission error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message || String(error)
        });
    }
}
