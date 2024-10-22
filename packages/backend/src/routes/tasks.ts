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

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await prisma.task.delete({
        where: {
            id: parseInt(id),
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

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, deadline, group, priority, progress, isDone } = req.body;

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

    const task = await prisma.task.update({
        where: {
            id: parseInt(id),
        },
        data: {
            ...(title && { title }),
            ...(description && { description }),
            ...(deadline && { deadline: new Date(deadline) }),
            ...(typeof progress !== 'undefined' && { progress }),
            ...(typeof isDone !== 'undefined' && { isDone }),
            ...(priority && [Priority.HIGH, Priority.LOW, Priority.MEDIUM].includes(priority) && { priority }),
            ...(group && { groupId: dbGrp.id }),
        },
    });
    res.json({ task });
}
