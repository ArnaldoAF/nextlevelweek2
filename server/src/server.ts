import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(express.json()); //para o express entender JSON(ajuda a reconhecer o body)yarn add knex sq
console.log("TESTE");
//habilita urls especificas acessarem a api
app.use(cors());
console.log("TESTE2");
app.use(routes);


app.listen(3333); 