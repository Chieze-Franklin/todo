import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { Priority } from '@prisma/client';

export const createTask = async (req: Request, res: Response) => {
    const { title, description, deadline, group, priority } = req.body;
    const task = await prisma.task.create({
        data: {
            title,
            description: description || '',
            deadline: new Date(deadline),
            group: group || '',
            ...(priority && [Priority.HIGH, Priority.LOW, Priority.MEDIUM].includes(priority) && { priority }),
            userId: res.locals.user.id,
        },
    });
    res.json({ task });
}

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await prisma.task.findMany({
        where: {
            userId: res.locals.user.id,
        },
    });
    res.json({ tasks });
}
