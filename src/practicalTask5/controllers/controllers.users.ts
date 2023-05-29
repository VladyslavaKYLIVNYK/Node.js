import { Request, Response, NextFunction } from 'express';
import * as services from '../services/services.users';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await services.get(+req.params.userId));
    } catch (err) {
        next(err);
    }
};

export async function getUserById(req: Request, res: Response) {
    try {
        const userId = +req.params.userId;
        const user = await services.get(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await services.create({
            username: req.body.username,
            name: req.body.name,
        }));
    } catch (err) {
        next(err);
    }
};

export const put = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await services.update(+req.params.userId, {
            username: req.body.username,
            name: req.body.name,
        }));
    } catch (err) {
        next(err);
    }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await services.remove(+req.params.userId));
    } catch (err) {
        next(err);
    }
};

