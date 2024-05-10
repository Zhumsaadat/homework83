import express from 'express';
import Artists from '../models/Artists';
import { Artist } from '../types';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    const artists: Artist[] = await Artists.find();

    res.send(artists);
  } catch (e) {
    next(e);
  }
});

artistsRouter.post('/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) =>{
  try {
    const artists = req.body;
    if (!artists) {
      return res.status(422).send({error: 'Field is required'})
    }

    const artistsData: Artist = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      info: req.body.info,
      isPublished: req.body.isPublished,
    };

    const artist = new Artists(artistsData);
    await artist.save();

    return res.send(artist);
  } catch (e) {
    next(e);
  }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const artistId = req.params.id;
    await Artists.findByIdAndDelete(artistId);
    return  res.status(204).send({message: 'Artist is deleted'});
  } catch (error) {
    next(error);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const artistId = req.params.id;
    const artist = await Artists.findById(artistId);
    if (!artist) {
      return res.status(404).send({ error: 'Artist not fount' });
    }

    artist.isPublished = !artist.isPublished;
    await artist.save();
    res.send(artist);
  } catch (error) {
    next(error);
  }
});

export default artistsRouter;