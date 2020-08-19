import express from 'express';

import ClassController from './controllers/classesController';
import ConnectionController from './controllers/connectionsController';
import UserController from './controllers/userController';


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
routes.get('/classes', classesController.index);
routes.post('/connections', connectionController.create);
routes.get('/connections', connectionController.index);
routes.post('/register', userController.register);

export default routes;