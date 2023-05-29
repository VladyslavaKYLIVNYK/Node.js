import express from 'express';
import { Router } from 'express';
import Joi from 'joi';
import * as controllers from '../controllers/controllers.users';
import * as Updatingdata from '../Updatingdata/updatingdata.users';

const router: Router = express.Router();

router.get('/users', controllers.getUsers);

router.get('/users/:userId', controllers.getUserById);

// Створення користувача
router.post(
    '/users',
    Updatingdata.validateBody(
        Joi.object({
            username: Joi.string().required(),
            name: Joi.string(),
        })
    ),
    controllers.post
);

router.put(
    '/users/:userId',
    Updatingdata.validateBody(
        Joi.object({
            username: Joi.string(),
            name: Joi.string(),
        })
    ),
    controllers.put
);

// Видалення користувача за його id
router.delete('/users/:userId', controllers.deleteUserById);

export default router;