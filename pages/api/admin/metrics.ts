import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const adminAuth = req.headers['x-admin-auth'];
    if (adminAuth !== 'admin2025') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const [
            totalUsers,
            certificationsIssued,
            activeEnrollments,
            recentAttempts
        ] = await Promise.all([
            prisma.user.count(),
            prisma.certificate.count(),
            prisma.enrollment.count({ where: { completed: false } }),
            prisma.examAttempt.findMany({
                take: 10,
                orderBy: { completedAt: 'desc' },
                include: {
                    moduleProgress: {
                        include: {
                            enrollment: {
                                include: { user: { select: { email: true } } }
                            }
                        }
                    }
                }
            })
        ]);

        const formattedAttempts = recentAttempts.map(a => ({
            id: a.id,
            user: a.moduleProgress.enrollment.user.email,
            module: a.moduleProgress.moduleId,
            score: a.score,
            passed: a.passed,
            flags: a.flags ? JSON.parse(a.flags) : [],
            timestamp: a.completedAt
        }));

        res.status(200).json({
            metrics: {
                totalUsers,
                certificationsIssued,
                activeEnrollments
            },
            recentActivity: formattedAttempts
        });

    } catch (error) {
        console.error("Error fetching metrics:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
