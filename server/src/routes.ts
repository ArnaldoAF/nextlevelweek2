import express from 'express';

import ClassController from './controllers/classesController';


const routes = express.Router();
const classesController = new ClassController();



routes.get('/test', (request, response) => {
    console.log('Acessou a rota');

    return response.json({"response": "ok"});
});

routes.post('/users', (request, response) => {
    const data = request.body;
    console.log(data);

    return response.json({"response": "ok"});
});

routes.post('/classes', classesController.create)

export default routes;