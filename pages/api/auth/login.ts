import type { NextApiRequest, NextApiResponse } from 'next';
import { findUserByEmail } from '../../../lib/userDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing credentials' });
    }

    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // In a production app, we would set a session cookie or return a JWT here.
    // For this implementation, we will return the user object (minus password) 
    // to be stored in the frontend state.

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
        message: 'Login successful',
        user: userWithoutPassword
    });
}
