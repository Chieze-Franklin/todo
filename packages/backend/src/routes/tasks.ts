import { Priority } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const createTask = async (req: Request, res: Response) => {
    const { title, description, deadline, group, priority } = req.body;
    // if group is not provided, set it to 'Default Group'
    // ensure group is created if it does not exist
    let dbGrp = await prisma.group.findFirst({
        where: {
            title: group || 'Default Group',
        },
    });
    if (!dbGrp) {
        dbGrp = await prisma.group.create({
            data: {
                title: group || 'Default Group',
                userId: res.locals.user.id,
            },
        });
    }
    const task = await prisma.task.create({
        data: {
            title,
            description: description || '',
            deadline: new Date(deadline),
            groupId: dbGrp.id,
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
        include: {
            group: true,
        },
    });
    res.json({ tasks });
}
