import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    // const user = await User.findOne({ username });
    // if (!user) {
    //     return res.status(401).send('Invalid username');
    // }
    // if (user.password !== password) {
    //     return res.status(401).send('Invalid password');
    // }
    // const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
    // res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000, signed: true });
    // return res.send('login');
    res.json({ username, token: '' });
}

export const logout = async (req: Request, res: Response) => {
    // res.clearCookie('token');
    res.send('logout');
}

export const jwtAuth = async (req: Request, res: Response, next: any) => {
    // const token = req.signedCookies.token;
    // if (!token) {
    //     return res.status(401).send('Unauthorized');
    // }
    // jwt.verify(token, 'secret', (err, decoded) => {
    //     if (err) {
    //         return res.status(401).send('Unauthorized');
    //     }
    //     next();
    // });
    next();
}
