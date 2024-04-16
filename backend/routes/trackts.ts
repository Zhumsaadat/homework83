import express from 'express';
import { TracksMutation } from '../types';
import Tracks from '../models/Tracks';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    let tracks;
    if(req.query.album) {
      tracks = await Tracks.find({ track: req.query.album }).populate("album", "_id name");
    } else {
      tracks = await Tracks.find();
    }

    res.send(tracks);
  } catch (e) {
    next(e);
  }
});

tracksRouter.post("/", async (req, res, next) => {
  try {
    const track = req.body;
    if(!track) {
      return res.status(422).send({error: 'Field is required'})
    }

    const trackData: TracksMutation = {
      name: req.body.name,
      duration: req.body.duration,
      album: req.body.album,
    };

    const newTrack  = new Tracks(trackData);
    await  newTrack.save();

    return res.send(newTrack);
  }catch (e) {
    next(e);
  }
});

export default tracksRouter;