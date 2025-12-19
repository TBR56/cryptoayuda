import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
        return res.status(400).send('<h1>Token inválido</h1>');
    }

    try {
        const subscriber = await prisma.subscriber.findUnique({
            where: { token },
        });

        if (!subscriber) {
            return res.status(404).send('<h1>Token no encontrado o caducado</h1>');
        }

        await prisma.subscriber.update({
            where: { id: subscriber.id },
            data: {
                status: 'CONFIRMED',
                token: '', // Clear token after use
            },
        });

        // Redirect to a success page or show a nice message
        res.setHeader('Content-Type', 'text/html');
        return res.send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1 style="color: #6366f1;">✅ ¡Suscripción Confirmada!</h1>
        <p>Gracias por confiar en CryptoAyuda. Ya estás en nuestra lista de alertas prioritarias.</p>
        <p>Recibirás tu guía y las alertas de seguridad en los próximos minutos.</p>
        <br />
        <a href="/" style="color: #6366f1; font-weight: bold; text-decoration: none;">Volver al Inicio</a>
      </div>
    `);
    } catch (error) {
        console.error('Confirmation Error:', error);
        return res.status(500).send('<h1>Error interno del servidor</h1>');
    }
}
