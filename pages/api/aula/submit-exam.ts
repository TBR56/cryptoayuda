import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { QUESTION_BANK } from '../../../lib/courseData';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { enrollmentId, moduleId, answers, timeSpentSeconds, flags } = req.body;

    if (!enrollmentId || !moduleId || !answers) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    // 1. Grade the exam
    const moduleQuestions = QUESTION_BANK[moduleId] || [];
    if (moduleQuestions.length === 0) {
        // Fallback or error if no questions found (simulation)
        return res.status(200).json({ passed: true, score: 100, feedback: ["Simulación aprobada"] });
    }

    let correctCount = 0;
    moduleQuestions.forEach(q => {
        if (answers[q.id] === q.correctOptionIndex) {
            correctCount++;
        }
    });

    const score = (correctCount / moduleQuestions.length) * 100;
    const passed = score >= 70; // 70% passing grade

    try {
        // 2. Find or Create Module Progress
        let moduleProgress = await prisma.moduleProgress.findFirst({
            where: { enrollmentId, moduleId }
        });

        if (!moduleProgress) {
            moduleProgress = await prisma.moduleProgress.create({
                data: {
                    enrollmentId,
                    moduleId,
                    lessons: '[]' // Needed field
                }
            });
        }

        // 3. Log Attempt
        await prisma.examAttempt.create({
            data: {
                moduleProgressId: moduleProgress.id,
                score,
                passed,
                startedAt: new Date(Date.now() - (timeSpentSeconds * 1000)),
                completedAt: new Date(),
                flags: JSON.stringify(flags || [])
            }
        });

        // 4. Update Completion if passed
        if (passed) {
            await prisma.moduleProgress.update({
                where: { id: moduleProgress.id },
                data: { completed: true }
            });

            // Check if course is fully complete (logic omitted for brevity but would go here)
        }

        res.status(200).json({ passed, score });

    } catch (error) {
        console.error("Exam submission error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
