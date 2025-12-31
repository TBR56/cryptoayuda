import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { Resend } from 'resend';

// Lazy init or safe check
const getResend = () => {
    if (process.env.RESEND_API_KEY) {
        return new Resend(process.env.RESEND_API_KEY);
    }
    return null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { email, plan, amount, method, txHash, proofImageBase64, metadata } = req.body;

        if (!email || !plan || !amount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // 1. Find or Create User
        let user = await prisma.user.findUnique({ where: { email } });
        let tempPassword = '';
        let isNewUser = false;

        if (!user) {
            isNewUser = true;
            tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            user = await prisma.user.create({
                data: {
                    email,
                    password: tempPassword,
                    plan: 'none'
                }
            });
        }

        // 2. Create Payment Record
        const payment = await prisma.payment.create({
            data: {
                email,
                plan,
                amount: Number(amount),
                status: 'pending',
                userId: user.id,
                proofImageUrl: txHash || proofImageBase64 || `manual_${Date.now()}`
            }
        });

        // 3. Email Automation
        const resend = getResend();
        if (resend) {
            const emailHtml = `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: white; padding: 40px; border-radius: 20px;">
                    <h1 style="color: #818cf8; margin-bottom: 20px;">¡Inscripción Recibida! 🚀</h1>
                    <p style="color: #94a3b8; font-size: 16px; line-height: 1.6;">
                        Hola, hemos recibido tu solicitud de inscripción al <strong>Plan ${plan}</strong>.
                    </p>
                    <p style="color: #94a3b8; font-size: 16px; line-height: 1.6;">
                        Nuestro sistema está verificando tu pago. Si pagaste con Cripto (EVM) y el hash es correcto, esto será rápido. Si es transferencia manual, un humano lo aprobará pronto.
                    </p>
                    
                    ${isNewUser ? `
                    <div style="background: #1e293b; padding: 20px; border-radius: 10px; border: 1px solid #334155; margin: 30px 0;">
                        <h3 style="margin-top: 0; color: white;">Tus Credenciales Provisionales</h3>
                        <p style="margin: 5px 0; color: #cbd5e1;">Usuario: <strong>${email}</strong></p>
                        <p style="margin: 5px 0; color: #cbd5e1;">Contraseña: <strong style="color: #e879f9;">${tempPassword}</strong></p>
                        <p style="font-size: 12px; color: #64748b; margin-top: 10px;">Te recomendamos cambiarla al ingresar.</p>
                    </div>
                    ` : `
                    <div style="background: #1e293b; padding: 20px; border-radius: 10px; margin: 30px 0;">
                        <p style="color: white; margin: 0;">Tu cuenta ya existe. El nuevo plan se activará automáticamente en tu perfil existente al confirmarse el pago.</p>
                    </div>
                    `}

                    <p style="color: #64748b; font-size: 14px; margin-top: 40px;">
                        Si tienes dudas, responde a este correo.<br>
                        Atentamente, el equipo de CryptoAyuda.
                    </p>
                </div>
            `;

            await resend.emails.send({
                from: 'CryptoAyuda <onboarding@cryptoayuda.org>',
                to: email,
                subject: `Recibida: Inscripción Plan ${plan} - CryptoAyuda`,
                html: emailHtml
            });
            console.log(`[Email Sent] Welcome email sent to ${email}`);
        } else {
            console.log('[Email Skipped] RESEND_API_KEY not set.');
        }

        return res.status(200).json({
            success: true,
            paymentId: payment.id,
            message: 'Payment processed and email queued.'
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
