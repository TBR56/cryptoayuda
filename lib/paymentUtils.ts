import { prisma } from './prisma';
import { sendWelcomeEmail } from './resend';

export async function processSuccessfulPayment(email: string, plan: string, amount: number | string, txHash: string, status: 'approved' | 'pending' = 'approved') {
    try {
        // Find or create user
        let user = await prisma.user.findUnique({ where: { email } });
        const tempPassword = Math.random().toString(36).slice(-10);

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    password: tempPassword,
                    plan: status === 'approved' ? plan.toLowerCase() : 'none',
                }
            });

            if (status === 'approved') {
                // Only send welcome with credentials if approved
                await sendWelcomeEmail(email, tempPassword, plan);
                console.log(`[Payment Utils] User ${email} created and activated.`);
            } else {
                console.log(`[Payment Utils] User ${email} created but pending activation.`);
            }
        } else {
            if (status === 'approved') {
                // Update plan if user exists and payment is approved
                await prisma.user.update({
                    where: { id: user.id },
                    data: { plan: plan.toLowerCase() }
                });
                console.log(`[Payment Utils] User ${email} plan updated to ${plan}.`);
            }
        }

        // Record payment
        const payment = await prisma.payment.create({
            data: {
                email,
                plan,
                amount: parseFloat(amount.toString()),
                status,
                userId: user.id,
                proofImageUrl: txHash,
            }
        });

        return { user, payment };
    } catch (err) {
        console.error('[Payment Utils Error]:', err);
        throw err;
    }
}
