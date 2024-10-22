import { Request, Response } from 'express';
import { createGroup, deleteGroup, getGroups } from './groups'; // Adjust path
import { prisma } from '../prisma';

jest.mock('../prisma', () => ({
    prisma: {
        group: {
            create: jest.fn(),
            deleteMany: jest.fn(),
            findMany: jest.fn(),
        },
    },
}));

describe('Group Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
        };
        res = {
            json: jest.fn(),
            locals: { user: { id: 1 } },
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createGroup', () => {
        it('should create a group and return the group', async () => {
            req.body = { title: 'New Group' };

            const mockGroup = { id: 1, title: 'New Group', userId: 1 };
            (prisma.group.create as jest.Mock).mockResolvedValue(mockGroup);

            await createGroup(req as Request, res as Response);

            expect(prisma.group.create).toHaveBeenCalledWith({
                data: { title: 'New Group', userId: 1 },
            });
            expect(res.json).toHaveBeenCalledWith({ group: mockGroup });
        });
    });

    describe('deleteGroup', () => {
        it('should delete groups by title and return the count of deleted groups', async () => {
            req.params = { title: 'Group to Delete' };

            (prisma.group.deleteMany as jest.Mock).mockResolvedValue({ count: 1 });

            await deleteGroup(req as Request, res as Response);

            expect(prisma.group.deleteMany).toHaveBeenCalledWith({
                where: { title: 'Group to Delete' },
            });
            expect(res.json).toHaveBeenCalledWith({ count: 1 });
        });
    });

    describe('getGroups', () => {
        it('should return all groups for the logged-in user', async () => {
            const mockGroups = [
                { id: 1, title: 'Group 1', userId: 1 },
                { id: 2, title: 'Group 2', userId: 1 },
            ];
            (prisma.group.findMany as jest.Mock).mockResolvedValue(mockGroups);

            await getGroups(req as Request, res as Response);

            expect(prisma.group.findMany).toHaveBeenCalledWith({
                where: { userId: 1 },
            });
            expect(res.json).toHaveBeenCalledWith({ groups: mockGroups });
        });
    });
});
