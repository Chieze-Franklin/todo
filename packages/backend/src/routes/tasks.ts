import { Task } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await prisma.task.findMany({
        where: {
            userId: res.locals.user.id,
        },
    });
    res.json({ tasks });
}
