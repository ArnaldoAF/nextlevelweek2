import express from 'express';

const routes = express.Router();

routes.get('/test', (request, response) => {
    console.log('Acessou a rota');

    return response.json({"response": "ok"});
});

routes.post('/users', (request, response) => {
    console.log(request.body)

    return response.json({"response": "ok"});
})

export default routes;