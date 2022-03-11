import express from 'express';
import bodyParser from 'body-parser';
import { fetchData } from './controllers/fetchFunction';
import { putData } from './controllers/putFunction';
import { deleteData } from './controllers/deleteFunction';

// Luodaan express prosessi
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

// Asetetaan prosessille portti
app.listen(port, () => {
  console.log(`Running on port ${port}.`);
});

// Päätepiste get, jossa on valinnainen parametri
app.get('/items:id?', fetchData);

// Päätepiste put
app.put('/items', putData);

// Päätepiste delete, jossa on pakollinen parametri
app.delete('/items:id?', deleteData);
