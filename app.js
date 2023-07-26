import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import mainRouter from './routes.js';
import { DB_URI, PORT } from './src/constants.js';

try {
  mongoose.connect(DB_URI).then(() => {
    console.log('Database connection established successfully');
  });
} catch (err) {
  console.log(err);
}

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  }),
);

app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
