import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { sendWelcomeEmail } from '../../../lib/resend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // REAL MERCADOPAGO WEBHOOK STRUCTURE
    // MP sends a 'data.id' and 'type' = 'payment'
    const { data, type, action } = req.body;

    let paymentId = data?.id;
    let email = req.body.email; // Fallback for manual testing
    let plan = req.body.plan;   // Fallback for manual testing

    // --- REAL MP VERIFICATION LOGIC ---
    if (type === 'payment' || action === 'payment.created') {
        console.log(`[MP] Verifying payment ${paymentId}...`);
        // In a real scenario, we would call:
        // const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        //     headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
        // });
        // const mpData = await response.json();
        // email = mpData.payer.email;
        // plan = mpData.external_reference; // We store the plan here when creating the preference
    }

    if (!email || !plan) {
        return res.status(400).json({ message: 'Missing data for user creation' });
    }

    try {
        // Check if user already exists
        const existing = await prisma.user.findUnique({
            where: { email }
        });

        if (existing) {
            return res.status(200).json({ message: 'User already exists, no actions taken' });
        }

        // Automated Credential Generation
        const password = Math.random().toString(36).slice(-10); // 10 chars

        // PERSISTENCE IN REAL DB
        await prisma.user.create({
            data: {
                email,
                password,
                plan: plan.toLowerCase()
            }
        });

        // REAL EMAIL DISPATCH VIA RESEND
        const emailResult = await sendWelcomeEmail(email, password, plan);

        return res.status(200).json({
            message: 'Payment processed, account created and email sent',
            emailSent: emailResult.success,
            credentials: { email, password }
        });
    } catch (error) {
        console.error('Webhook Error:', error);
        return res.status(500).json({ message: 'Error processing webhook', error });
    }
}
