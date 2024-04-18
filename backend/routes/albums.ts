import express from 'express';
import { AlbumsMutation } from '../types';
import Albums from '../models/Albums';
import { Types } from 'mongoose';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    let albums;
    if (req.query.artist) {
      albums = await Albums.find({artist: req.query.artist}).populate('singer', '_id name');
    } else {
      albums = await Albums.find().populate('singer', '_id name');
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


albumsRouter.post('/', async (req, res, next) => {
  try {
    const album = req.body;
    if (!album) {
      return res.status(422).send({error: 'Field is required'});
    }

    const albumData: AlbumsMutation = {
      name: req.body.name,
      singer: req.body.singer,
      date: req.body.date,
      image: req.body.image,//req.file ? req.file.filename : null
    };

    const albumForSend = new Albums(albumData);
    await albumForSend.save();

    return res.send(albumForSend);
  } catch (e) {
    next(e);
  }
});

export default albumsRouter;