import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

//habilita urls especificas acessarem a api
app.use(cors());
app.use(express.json()); //para o express entender JSON(ajuda a reconhecer o body)yarn add knex sq
app.use(routes);


app.listen(3333);