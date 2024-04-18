import express from 'express';
import User from '../models/User';
import TrackHistory from '../models/TrackHistory';


const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({error: 'No token present'});
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: 'Unauthorized'});
    }

    const trackHistoryData = new TrackHistory({
      user: user._id,
      track: req.body.track,
      datetime: req.body.datetime,
    });

    const newTrackHistory = new TrackHistory(trackHistoryData);
    await newTrackHistory.save();
    res.send(newTrackHistory);

  } catch (e) {
    next(e);
  }
});

export default trackHistoryRouter;