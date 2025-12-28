import { Resend } from 'resend';

// NOTE: In production, the API key should be in process.env.RESEND_API_KEY
export const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function sendWelcomeEmail(email: string, pass: string, plan: string) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Academia Cripto <academia@cryptoayuda.org>',
            to: [email],
            subject: '🚀 Tu acceso a Academia Cripto Segura',
            html: `
                <div style="font-family: sans-serif; background-color: #020617; color: white; padding: 40px; border-radius: 20px;">
                    <h1 style="color: #3b82f6; text-transform: uppercase;">¡Bienvenido a la Academia!</h1>
                    <p>Tu inscripción al <strong>Plan ${plan.toUpperCase()}</strong> se ha completado con éxito.</p>
                    <hr style="border-color: #1e293b; margin: 20px 0;" />
                    <p>Aquí tienes tus credenciales privadas de acceso:</p>
                    <div style="background-color: #0f172a; padding: 20px; border-radius: 10px; border: 1px solid #1e293b;">
                        <p><strong>Usuario:</strong> ${email}</p>
                        <p><strong>Contraseña:</strong> ${pass}</p>
                    </div>
                    <p style="margin-top: 30px;">
                        <a href="https://www.cryptoayuda.org/acceso/login" 
                           style="background-color: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: bold; display: inline-block;">
                           INGRESAR A LA PLATAFORMA
                        </a>
                    </p>
                    <p style="font-size: 12px; color: #64748b; margin-top: 40px;">
                        Si no realizaste esta compra, por favor ignora este email.
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error('Error sending email via Resend:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Crash in mail service:', err);
        return { success: false, error: err };
    }
}
