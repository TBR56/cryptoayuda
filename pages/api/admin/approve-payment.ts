import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { resend } from '../../../lib/resend';

function generatePassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { paymentId } = req.body;

    if (!paymentId) {
        return res.status(400).json({ message: 'Payment ID required' });
    }

    try {
        // Get payment
        const payment = await prisma.payment.findUnique({
            where: { id: paymentId }
        });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        if (payment.status !== 'pending') {
            return res.status(400).json({ message: 'Payment already processed' });
        }

        // Generate password
        const tempPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email: payment.email,
                password: hashedPassword,
                plan: payment.plan
            }
        });

        // Update payment
        await prisma.payment.update({
            where: { id: paymentId },
            data: {
                status: 'approved',
                userId: user.id,
                approvedBy: 'admin' // You can customize this
            }
        });

        // Send welcome email with credentials
        try {
            await resend.emails.send({
                from: 'Academia Cripto Segura <academia@cryptoayuda.org>',
                to: payment.email,
                subject: '🎓 ¡Bienvenido a Academia Cripto Segura! - Tus Credenciales',
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <style>
                            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 40px 20px; }
                            .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; padding: 40px; border: 1px solid rgba(255,255,255,0.1); }
                            .logo { text-align: center; margin-bottom: 32px; }
                            .logo h1 { font-size: 32px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: -1px; }
                            .logo span { color: #f59e0b; }
                            .badge { display: inline-block; background: #10b981; color: white; padding: 8px 16px; border-radius: 999px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px; }
                            h2 { font-size: 28px; font-weight: 900; margin: 0 0 16px 0; text-transform: uppercase; font-style: italic; letter-spacing: -1px; }
                            p { color: #94a3b8; line-height: 1.6; margin: 0 0 16px 0; }
                            .credentials-box { background: rgba(15, 23, 42, 0.8); border: 2px solid rgba(245, 158, 11, 0.3); border-radius: 16px; padding: 24px; margin: 32px 0; }
                            .credential-item { margin-bottom: 16px; }
                            .credential-label { font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 900; letter-spacing: 1px; margin-bottom: 4px; }
                            .credential-value { font-size: 20px; font-weight: 900; color: #f59e0b; font-family: 'Courier New', monospace; }
                            .cta-button { display: inline-block; background: #f59e0b; color: #0f172a; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; margin: 24px 0; }
                            .warning-box { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 16px; margin: 24px 0; }
                            .warning-box p { color: #fca5a5; font-size: 13px; margin: 0; }
                            .footer { text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); }
                            .footer p { font-size: 12px; color: #475569; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="logo">
                                <h1>Crypto<span>Ayuda</span></h1>
                            </div>
                            
                            <div class="badge">✓ Pago Verificado</div>
                            
                            <h2>¡Bienvenido a la Academia!</h2>
                            <p>Tu pago ha sido confirmado y tu cuenta ha sido activada exitosamente. Ahora tienes acceso completo al <strong style="color: #f59e0b;">Plan ${payment.plan.charAt(0).toUpperCase() + payment.plan.slice(1)}</strong>.</p>
                            
                            <div class="credentials-box">
                                <div class="credential-item">
                                    <div class="credential-label">Usuario (Email)</div>
                                    <div class="credential-value">${payment.email}</div>
                                </div>
                                <div class="credential-item">
                                    <div class="credential-label">Contraseña Temporal</div>
                                    <div class="credential-value">${tempPassword}</div>
                                </div>
                            </div>
                            
                            <div class="warning-box">
                                <p><strong>⚠️ IMPORTANTE:</strong> Por tu seguridad, cambia esta contraseña temporal inmediatamente después de iniciar sesión por primera vez.</p>
                            </div>
                            
                            <center>
                                <a href="https://cryptoayuda.org/acceso/login" class="cta-button">Acceder a la Plataforma →</a>
                            </center>
                            
                            <p style="margin-top: 32px;">Una vez dentro, podrás:</p>
                            <ul style="color: #94a3b8; line-height: 1.8;">
                                <li>Acceder a todas las lecciones de tu plan</li>
                                <li>Ver videos y contenido interactivo</li>
                                <li>Cambiar tu contraseña en cualquier momento</li>
                                <li>Descargar recursos complementarios</li>
                            </ul>
                            
                            <div class="footer">
                                <p>Si tienes alguna duda, responde a este email.<br>Equipo de Academia Cripto Segura</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `
            });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // Continue anyway, user is created
        }

        return res.status(200).json({
            message: 'Payment approved and user created',
            user: {
                email: user.email,
                plan: user.plan
            }
        });
    } catch (error) {
        console.error('Error approving payment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
