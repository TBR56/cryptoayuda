import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

const PAYMENTS_FILE = path.join('/tmp', 'payments.json');

async function getPayments() {
    try {
        const data = await fs.readFile(PAYMENTS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const payments = await getPayments();
        return res.status(200).json({ payments });
    } catch (error) {
        console.error('Error fetching payments:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
