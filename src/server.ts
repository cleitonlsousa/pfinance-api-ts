import * as dotenv from 'dotenv';
import express from 'express';
import conn from './config/DataBase'
import Routes from './routes/Routes';

dotenv.config()

conn()

const app = express();

app.use(express.json());
app.use(Routes)

app.listen(5080, () => {
    console.log("Server started on port 5080");
  });
