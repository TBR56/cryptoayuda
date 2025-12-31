import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Basic security check (should be improved with proper session)
    const adminAuth = req.headers['x-admin-auth'];
    if (adminAuth !== 'admin2025') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                email: true,
                plan: true,
                createdAt: true,
                payments: {
                    select: {
                        amount: true,
                        status: true
                    }
                },
                enrollments: {
                    select: {
                        courseId: true,
                        progress: true,
                        completed: true,
                        cert: {
                            select: {
                                publicId: true,
                                issuedAt: true
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
