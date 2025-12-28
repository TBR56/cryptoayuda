import type { NextApiRequest, NextApiResponse } from 'next';
import { resend } from '../../../lib/resend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { email, plan, amount, proofImageBase64 } = req.body;

        console.log('Received payment submission:', { email, plan, amount });

        if (!email || !plan || !amount || !proofImageBase64) {
            return res.status(400).json({
                message: 'Missing required fields',
                received: { email: !!email, plan: !!plan, amount: !!amount, image: !!proofImageBase64 }
            });
        }

        // Send email to admin with payment details
        try {
            await resend.emails.send({
                from: 'Pagos Academia <pagos@cryptoayuda.org>',
                to: email, // Send copy to user
                subject: `✅ Comprobante Recibido - Plan ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <style>
                            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 40px 20px; }
                            .container { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 40px; border: 1px solid rgba(255,255,255,0.1); }
                            h1 { color: #10b981; margin: 0 0 20px 0; }
                            .info { background: #0f172a; padding: 20px; border-radius: 12px; margin: 20px 0; }
                            .label { color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 4px; }
                            .value { color: #f59e0b; font-size: 18px; font-weight: bold; }
                            img { max-width: 100%; border-radius: 12px; margin: 20px 0; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>✅ Comprobante Recibido</h1>
                            <p>Hemos recibido tu comprobante de pago. Te confirmaremos el acceso en las próximas 24 horas.</p>
                            
                            <div class="info">
                                <div class="label">Email</div>
                                <div class="value">${email}</div>
                            </div>
                            
                            <div class="info">
                                <div class="label">Plan</div>
                                <div class="value">${plan.charAt(0).toUpperCase() + plan.slice(1)}</div>
                            </div>
                            
                            <div class="info">
                                <div class="label">Monto</div>
                                <div class="value">$${amount.toLocaleString()} ARS</div>
                            </div>
                            
                            <div class="info">
                                <div class="label">Comprobante</div>
                                <img src="${proofImageBase64}" alt="Comprobante de pago" />
                            </div>
                            
                            <p style="margin-top: 30px; color: #64748b; font-size: 14px;">
                                Recibirás un email con tus credenciales de acceso una vez que verifiquemos el pago.
                            </p>
                        </div>
                    </body>
                    </html>
                `
            });
        } catch (emailError) {
            console.error('Email error:', emailError);
            // Continue anyway
        }

        const paymentId = `pay_${Date.now()}`;
        console.log('Payment processed:', paymentId);

        return res.status(200).json({
            message: 'Payment proof submitted successfully',
            paymentId
        });
    } catch (error: any) {
        console.error('Payment submission error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message || String(error)
        });
    }
}
