import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const { email, selection } = req.body;

    if (!email || !selection) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const token = crypto.randomBytes(32).toString('hex');
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cryptoayudahoy.vercel.app';

        // 1. Save or Update Subscriber
        await prisma.subscriber.upsert({
            where: { email },
            update: {
                status: 'PENDING',
                token,
                metadata: JSON.stringify(selection),
            },
            create: {
                email,
                token,
                status: 'PENDING',
                metadata: JSON.stringify(selection),
            },
        });

        // 2. Send Confirmation Email
        const confirmLink = `${baseUrl}/api/confirm?token=${token}`;

        await resend.emails.send({
            from: 'CryptoAyuda <alertas@cryptoayudahoy.vercel.app>',
            to: [email],
            subject: '⚠️ Confirma tu Alerta de Seguridad - CryptoAyuda',
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #6366f1;">Casi está listo tu diagnóstico</h2>
          <p>Hola,</p>
          <p>Hemos recibido tu solicitud de diagnóstico para <strong>${selection.exchange}</strong>. Para activar tus alertas de seguridad y descargar la guía completa, necesitamos que confirmes tu correo electrónico.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmLink}" style="background-color: #6366f1; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">CONFIRMAR EMAIL Y ACTIVAR ALERTAS</a>
          </div>
          <p style="font-size: 12px; color: #666;">Si no realizaste esta solicitud, puedes ignorar este correo. Cumplimos con la normativa GDPR y nunca compartiremos tus datos.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 10px; color: #999; text-align: center;">© 2025 CryptoAyuda Team. Seguridad Cripto para todos.</p>
        </div>
      `,
        });

        return res.status(200).json({ success: true });
    } catch (error: any) {
        console.error('Diagnosis Error:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
