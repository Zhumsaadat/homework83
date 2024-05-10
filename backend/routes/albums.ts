import express from 'express';
import { AlbumsMutation } from '../types';
import Albums from '../models/Albums';
import { Types } from 'mongoose';
import { imagesUpload } from '../multer';
import permit from '../middleware/permit';
import auth from '../middleware/auth';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    let albums;
    const singer = req.query.singer as string
    if (singer) {
      albums = await Albums.find({singer: singer}).sort({ date: -1 });

    } else {
      albums = await Albums.find().populate('singer', '_id name').sort({date: -1});

    }

    res.send(albums);
  } catch (e) {
    next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;

    try {
      _id = new Types.ObjectId(req.params.id);
    } catch (e) {
      return res.status(404).send({error: 'Wrong ObjectId'});
    }

    const album = await Albums.findOne({_id}).populate('singer', '_id name');

    if (!album) {
      return res.status(404).send({error: 'Not found!'});
    }

    return res.send(album);
  } catch (e) {
    next(e);
  }
});


albumsRouter.post('/',
  auth,
  imagesUpload.single('image'),
  async (req, res, next) => {
  try {
    const album = req.body;
    if (!album) {
      return res.status(422).send({error: 'Field is required'});
    }

    const albumData: AlbumsMutation = {
      name: req.body.name,
      singer: req.body.singer,
      date: Date.now(),
      image: req.file ? req.file.filename : null,
      isPublished: req.body.isPublished,
    };

    const albumForSend = new Albums(albumData);
    await albumForSend.save();

    return res.send(albumForSend);
  } catch (e) {
    next(e);
  }
});

export default albumsRouter;