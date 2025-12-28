import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { paymentId, reason } = req.body;

    if (!paymentId) {
        return res.status(400).json({ message: 'Payment ID required' });
    }

    try {
        await prisma.payment.update({
            where: { id: paymentId },
            data: {
                status: 'rejected',
                rejectionReason: reason || 'No especificado'
            }
        });

        // TODO: Send rejection email to user
        // You can implement this later

        return res.status(200).json({ message: 'Payment rejected' });
    } catch (error) {
        console.error('Error rejecting payment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
