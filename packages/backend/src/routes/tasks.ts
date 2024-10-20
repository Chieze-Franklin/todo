import { Request, Response } from 'express';
import { Task } from '../models/task';

export const getTasks = async (req: Request, res: Response) => {
    const tasks: Task[] = []; // await Task.find();
    res.send(tasks);
}
