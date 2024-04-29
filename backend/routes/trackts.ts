import express from 'express';
import { TracksMutation } from '../types';
import Tracks from '../models/Tracks';
import { Types } from 'mongoose';


const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    let tracks;
    const album = req.query.album as string
    if (album) {
      tracks = await Tracks.find({album: album});
    }  else {
      tracks = await Tracks.find();
    }

    res.send(tracks);
  } catch (e) {
    next(e);
  }
});

tracksRouter.get('/:id', async (req, res, next) => {
  try{
    let _id: Types.ObjectId;

    try {
      _id = new Types.ObjectId(req.params.id);
    } catch (e) {
      return res.status(404).send({error: 'Wrong ObjectId'});
    }

    const track = await Tracks.findOne({_id});

    if (!track) {
      return res.status(404).send({error: 'Not found!'});
    }

    return res.send(track);
  }catch (e) {
    next(e);
  }
});

tracksRouter.post('/', async (req, res, next) => {
  try {
    const track = req.body;
    if (!track) {
      return res.status(422).send({error: 'Field is required'});
    }

    const trackData: TracksMutation = {
      name: req.body.name,
      duration: req.body.duration,
      album: req.body.album,
    };

    const newTrack = new Tracks(trackData);
    await newTrack.save();

    return res.send(newTrack);
  } catch (e) {
    next(e);
  }
});

export default tracksRouter;