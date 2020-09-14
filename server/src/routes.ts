import express, { Router } from 'express';

import ClassController from './controllers/classesController';
import ConnectionController from './controllers/connectionsController';
import UserController from './controllers/userController';
import authMiddleware from './middleware/auth';


const routes = express.Router();
const classesController = new ClassController();
const connectionController = new ConnectionController();
const userController = new UserController();



routes.get('/test', (request, response) => {
    console.log('Acessou a rota');

    return response.json({"response": "ok"});
});

routes.post('/users', (request, response) => {
    const data = request.body;
    console.log(data);

    return response.json({"response": "ok"});
});

routes.post('/classes', classesController.create);

routes.post('/connections', connectionController.create);
routes.get('/connections', connectionController.index);
routes.post('/register', userController.register);
routes.post('/login', userController.login);
routes.use(authMiddleware);
routes.get('/me', userController.me);
routes.get('/classes', classesController.index);

export default routes;