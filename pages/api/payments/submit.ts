import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import fs from 'fs/promises';
import path from 'path';
import { prisma } from '../../../lib/prisma';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const form = new IncomingForm({
            uploadDir: path.join(process.cwd(), 'public', 'uploads'),
            keepExtensions: true,
            maxFileSize: 5 * 1024 * 1024, // 5MB
        });

        // Ensure upload directory exists
        await fs.mkdir(path.join(process.cwd(), 'public', 'uploads'), { recursive: true });

        const [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve([fields, files]);
            });
        });

        const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
        const plan = Array.isArray(fields.plan) ? fields.plan[0] : fields.plan;
        const amount = parseFloat(Array.isArray(fields.amount) ? fields.amount[0] : fields.amount);
        const file = Array.isArray(files.file) ? files.file[0] : files.file;

        if (!email || !plan || !amount || !file) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Save file path relative to public
        const fileName = path.basename((file as any).filepath);
        const proofImageUrl = `/uploads/${fileName}`;

        // Create payment record
        const payment = await prisma.payment.create({
            data: {
                email,
                plan,
                amount,
                proofImageUrl,
                status: 'pending'
            }
        });

        // TODO: Send notification email to admin
        // You can implement this later with Resend

        return res.status(200).json({
            message: 'Payment proof submitted successfully',
            paymentId: payment.id
        });
    } catch (error) {
        console.error('Payment submission error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
