import express from 'express';
import { fetchData } from './controllers/fetchFunction';
import { putData } from './controllers/putFunction';
import { deleteData } from './controllers/deleteFunction';

// 
const app = express();
const port = process.env.PORT || 3000;

//
app.listen(port, () => {
  console.log(`Running on port ${port}.`);
});

// 
app.get('/fetch:id?', fetchData);

// 
app.put('/fetch:id?', putData);

// 
app.delete('/fetch:id', deleteData);