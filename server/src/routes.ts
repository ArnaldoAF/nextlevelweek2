import express from 'express';

import ClassController from './controllers/classesController';
import ConnectionController from './controllers/connectionsController';


const routes = express.Router();
const classesController = new ClassController();
const connectionController = new ConnectionController();



routes.get('/test', (request, response) => {
    console.log('Acessou a rota');

    return response.json({"response": "ok"});
});

routes.post('/users', (request, response) => {
    const data = request.body;
    console.log(data);

    return response.json({"response": "ok"});
});

routes.post('/classes', connectionController.create);
routes.get('/classes', classesController.index);
routes.post('/connections', connectionController.create);
routes.get('/connections', connectionController.index);

export default routes;