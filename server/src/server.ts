import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json()); //para o express entender JSON(ajuda a reconhecer o body)yarn add knex sq
app.use(routes);


app.listen(3333);