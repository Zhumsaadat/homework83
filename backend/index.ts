import express from 'express';
import cors from 'cors';
import artistsRouter from './routes/artists';
import mongoose from 'mongoose';
import config from './config';
import albumsRouter from './routes/albums';
import tracksRouter from './routes/trackts';
import user from './routes/user';
import trackHistoryRouter from './routes/trackHistory';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', user);
app.use('/track_history', trackHistoryRouter);


const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Port: ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();

