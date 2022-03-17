import express from 'express';
import ItemController from './controllers/itemController';

// Luodaan express prosessi
const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Asetetaan prosessille portti
app.listen(port, () => {
  console.log(`Running on port ${port}.`);
});

// Luo uusi globaali itemController olio
const itemController = new ItemController();

// Päätepiste get
app.get('/items', itemController.getAllItems);

// Päätepiste get, jossa on parametri id
app.get('/item', itemController.getItem);

// Päätepiste post
app.post('/item', itemController.insertItem);

// Päätepiste delete, jossa on parametri id
app.delete('/item', itemController.deleteItem);
