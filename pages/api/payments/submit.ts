import type { NextApiRequest, NextApiResponse } from 'next';
import { processSuccessfulPayment } from '../../../lib/paymentUtils';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb', // Base64 images can be large
        },
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { email, plan, amount, method, txHash, metadata, proofBase64 } = req.body;

        if (!email || !plan || !amount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // For Vercel compatibility (Read-only FS), we store the Base64 directly in the DB
        // In a high-traffic app, we'd use Vercel Blob or S3, but for this MVP, DB is fine.
        const proofUrl = proofBase64 || txHash || '';

        // For Manual Transfer or Crypto with proof, we mark as pending
        const status = (method === 'paypal' && !proofBase64) ? 'approved' : 'pending';

        const result = await processSuccessfulPayment(
            email,
            plan,
            amount,
            proofUrl,
            status
        );

        return res.status(200).json({
            success: true,
            paymentId: result.payment.id,
            message: status === 'approved' ? 'Pago procesado y cuenta activa.' : 'Pago registrado. Un administrador verificará tu comprobante pronto.'
        });

    } catch (error: any) {
        console.error("Payment Submission Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
}
