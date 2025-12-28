import type { NextApiRequest, NextApiResponse } from 'next';
import { saveUser, findUserByEmail, initDb } from '../../../lib/userDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // SIMULATED WEBHOOK DATA FROM PAYMENT PROVIDER
    const { email, plan, status } = req.body;

    if (status !== 'approved' || !email || !plan) {
        return res.status(400).json({ message: 'Invalid payment data' });
    }

    initDb();

    // Check if user already exists
    const existing = findUserByEmail(email);
    if (existing) {
        return res.status(200).json({ message: 'User already exists' });
    }

    // Automated Credential Generation
    const password = Math.random().toString(36).slice(-8); // Simple 8-char random pass

    const newUser = {
        email,
        password,
        plan, // basic | advanced | professional
        createdAt: new Date().toISOString()
    };

    saveUser(newUser);

    // MOCK EMAIL LOG (In production, use SendGrid/Nodemailer)
    console.log(`--- SIMULATED EMAIL SENT TO ${email} ---`);
    console.log(`Subject: Bienvenida a Academia Cripto Segura`);
    console.log(`User: ${email}`);
    console.log(`Pass: ${password}`);
    console.log(`Plan: ${plan}`);
    console.log(`Access URL: https://www.cryptoayuda.org/acceso/login`);
    console.log(`-------------------------------------------`);

    return res.status(200).json({
        message: 'Payment processed and user created',
        credentials: { email, password } // Returning for easy testing
    });
}
