import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            email,
        }
    });
    if (user) {
        if (user.password !== password) {
            res.status(401).json({ error: 'Invalid password' });
            return;
        }
    } else {
        const newUser = await prisma.user.create({
            data: {
                email,
                password,
            }
        });
    }
    const token = jwt.sign({ email }, process.env.SECRET as string, { expiresIn: '1h' });
    res.json({ email, token });
}

export const jwtAuth = async (req: Request, res: Response, next: any) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error('Unauthorized');
        }
        const decoded = jwt.verify(token, process.env.SECRET as string);
        const user = await prisma.user.findFirst({
            where: {
                email: (decoded as any).email as string,
            }
        });
        if (!user) {
            throw new Error('Unauthorized');
        }
        res.locals.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
}
