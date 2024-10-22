import { Request, Response } from 'express';
import { jwtAuth, login } from './auth'; // Adjust path if necessary
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';

jest.mock('jsonwebtoken');
jest.mock('../prisma', () => ({
    prisma: {
        user: {
            findFirst: jest.fn(),
            create: jest.fn(),
        },
    },
}));

describe('jwtAuth middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            headers: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 401 if no authorization header is present', async () => {
        await jwtAuth(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', async () => {
        req.headers = { authorization: 'invalid_token' };
        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid token');
        });

        await jwtAuth(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if no user is found in the database', async () => {
        req.headers = { authorization: 'valid_token' };
        (jwt.verify as jest.Mock).mockReturnValue({ email: 'test@example.com' });
        (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

        await jwtAuth(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next if user is authenticated', async () => {
        req.headers = { authorization: 'valid_token' };
        (jwt.verify as jest.Mock).mockReturnValue({ email: 'test@example.com' });
        (prisma.user.findFirst as jest.Mock).mockResolvedValue({ id: 1, email: 'test@example.com' });

        await jwtAuth(req as Request, res as Response, next);
        expect(prisma.user.findFirst).toHaveBeenCalledWith({
            where: { email: 'test@example.com' },
        });
        expect(res.locals?.user).toEqual({ id: 1, email: 'test@example.com' });
        expect(next).toHaveBeenCalled();
    });
});


describe('login function', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        req = {
            body: {},
        };
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnThis();
        res = {
            status: statusMock,
            json: jsonMock,
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 401 if the password is incorrect', async () => {
        req.body = { email: 'test@example.com', password: 'wrongpassword' };

        (prisma.user.findFirst as jest.Mock).mockResolvedValue({
            email: 'test@example.com',
            password: 'correctpassword',
        });

        await login(req as Request, res as Response);

        expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid password' });
    });

    it('should create a new user if the user does not exist', async () => {
        req.body = { email: 'newuser@example.com', password: 'newpassword' };

        (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
        (prisma.user.create as jest.Mock).mockResolvedValue({
            email: 'newuser@example.com',
            password: 'newpassword',
        });

        (jwt.sign as jest.Mock).mockReturnValue('mocked_jwt_token');

        await login(req as Request, res as Response);

        expect(prisma.user.create).toHaveBeenCalledWith({
            data: {
                email: 'newuser@example.com',
                password: 'newpassword',
            },
        });
        expect(res.json).toHaveBeenCalledWith({ email: 'newuser@example.com', token: 'mocked_jwt_token' });
    });

    it('should return a token for a valid user with correct password', async () => {
        req.body = { email: 'test@example.com', password: 'correctpassword' };

        (prisma.user.findFirst as jest.Mock).mockResolvedValue({
            email: 'test@example.com',
            password: 'correctpassword',
        });

        (jwt.sign as jest.Mock).mockReturnValue('mocked_jwt_token');

        await login(req as Request, res as Response);

        expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
        expect(jwt.sign).toHaveBeenCalledWith({ email: 'test@example.com' }, process.env.SECRET, { expiresIn: '1h' });
        expect(res.json).toHaveBeenCalledWith({ email: 'test@example.com', token: 'mocked_jwt_token' });
    });
});
