import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const createGroup = async (req: Request, res: Response) => {
    const { title } = req.body;
    const group = await prisma.group.create({
        data: {
            title,
            userId: res.locals.user.id,
        },
    });
    res.json({ group });
}

export const deleteGroup = async (req: Request, res: Response) => {
    const { title } = req.params;
    const group = await prisma.group.findFirst({
        where: {
            title,
            userId: res.locals.user.id,
        },
    });
    const result = await prisma.group.deleteMany({
        where: {
            title,
        },
    });

    const defaultGroup = await prisma.group.findFirst({
        where: {
            title: 'Default Group',
            userId: res.locals.user.id,
        },
    });
    if (group && defaultGroup) {
        await prisma.task.updateMany({
            where: {
                groupId: group.id,
            },
            data: {
                groupId: defaultGroup.id,
            },
        });
    }

    res.json({ count: result.count });
}

export const getGroups = async (req: Request, res: Response) => {
    const groups = await prisma.group.findMany({
        where: {
            userId: res.locals.user.id,
        },
    });
    res.json({ groups });
}
