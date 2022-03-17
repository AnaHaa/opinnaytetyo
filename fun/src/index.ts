import express from 'express';
import { getAllItems, getItem } from './controllers/getFunction';
import { insertItem } from './controllers/postFunction';
import { deleteItem } from './controllers/deleteFunction';

// Luodaan express prosessi
const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Asetetaan prosessille portti
app.listen(port, () => {
  console.log(`Running on port ${port}.`);
});

// Päätepiste get
app.get('/items', getAllItems);

// Päätepiste get
app.get('/item', getItem);

// Päätepiste post
app.post('/item', insertItem);

// Päätepiste delete
app.delete('/item', deleteItem);
