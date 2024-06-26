import express from 'express';
import { TracksMutation } from '../types';
import Tracks from '../models/Tracks';
import { Types } from 'mongoose';
import permit from '../middleware/permit';
import auth, { RequestWithUser } from '../middleware/auth';


const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    let tracks;
    const album = req.query.album as string
    if (album) {
      tracks = await Tracks.find({album: album}).sort({sequence: 1});
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
      _id = new Types.ObjectId(req.params.id)
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

tracksRouter.post('/',
  auth,
  async (req: RequestWithUser, res, next) => {
  try {
    console.log(req.body);
    const track = req.body;
    if (!track) {
      return res.status(422).send({error: 'Field is required'});
    }

    const trackData: TracksMutation = {
      name: req.body.name,
      duration: req.body.duration,
      album: req.body.album,
      isPublished: req.body.isPublished,
      sequence: req.body.sequence,
    };

    const newTrack = new Tracks(trackData);
    await newTrack.save();

    return res.send(newTrack);
  } catch (e) {
    next(e);
  }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const trackId = req.params.id;
    await Tracks.findByIdAndDelete(trackId);
    return  res.status(204).send({message: 'Track is deleted'});
  } catch (error) {
    next(error);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    if(!req.params.id) {
      return res.status(404).send({error: 'Track not fount'});
    }
      const trackId = req.params.id;

      const track = await Tracks.findById(trackId);
      if (!track) {
        return res.status(404).send({error: 'Track not fount'});
      }

    track.isPublished = !track.isPublished;
    await track.save();
    res.send(track);
  } catch (error) {
    next(error);
  }
});

export default tracksRouter;