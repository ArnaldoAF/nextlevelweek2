import express from 'express';

const app = express();


app.get('/test', (request, response) => {
    console.log('Acessou a rota');

    return response.json({"response": "ok"});
});


app.listen(3333);