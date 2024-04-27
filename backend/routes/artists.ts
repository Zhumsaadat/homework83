import express from 'express';
import Artists from '../models/Artists';
import { Artist } from '../types';
import { imagesUpload } from '../multer';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    const artists: Artist[] = await Artists.find();

    res.send(artists);
  } catch (e) {
    next(e);
  }
});

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const artists = req.body;
    if (!artists) {
      return res.status(422).send({error: 'Field is required'})
    }

    const artistsData: Artist = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      info: req.body.info,
    };

    const artist = new Artists(artistsData);
    await artist.save();

    return res.send(artist);
  } catch (e) {
    next(e);
  }
});

export default artistsRouter;