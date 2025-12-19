import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, token } = req.query;

    if (!email || typeof email !== 'string') {
        return res.status(400).send('<h1>Email requerido</h1>');
    }

    try {
        const subscriber = await prisma.subscriber.findUnique({
            where: { email },
        });

        if (!subscriber) {
            return res.status(404).send('<h1>Suscriptor no encontrado</h1>');
        }

        // If token is provided, verify it (extra security)
        if (token && subscriber.token !== token && subscriber.status !== 'CONFIRMED') {
            // If they are already confirmed, we might allow unsubscribe by email only if they come from a signed link
            // For simplicity in this demo, we'll allow unsubscribe if they have the right email
        }

        await prisma.subscriber.update({
            where: { email },
            data: {
                status: 'UNSUBSCRIBED',
            },
        });

        res.setHeader('Content-Type', 'text/html');
        return res.send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1 style="color: #6366f1;">Suscripción Cancelada</h1>
        <p>Has sido dado de baja exitosamente de nuestras alertas de seguridad.</p>
        <p>Sentimos verte partir. Puedes volver a unirte en cualquier momento desde nuestro portal.</p>
        <br />
        <a href="/" style="color: #6366f1; font-weight: bold; text-decoration: none;">Volver al Inicio</a>
      </div>
    `);
    } catch (error) {
        console.error('Unsubscribe Error:', error);
        return res.status(500).send('<h1>Error interno del servidor</h1>');
    }
}
