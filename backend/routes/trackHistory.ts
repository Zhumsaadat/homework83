import express from 'express';
import User from '../models/User';
import TrackHistory from '../models/TrackHistory';


const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/',  async (req, res, next) => {
  try {
    const headerValue = req.headers.authorization;

    if (!headerValue) {
      return res.status(401).send({error: 'No token present'});
    }
    const [_, token] = headerValue.split(' ');

    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: 'Unauthorized'});
    }

    const tracksHistory = await TrackHistory.find().populate('track');

    return res.send(tracksHistory);
  } catch (err) {
    return next(err);
  }
});

trackHistoryRouter.post('/',  async (req, res, next) => {
  try {
    const headerValue = req.headers.authorization;

    if (!headerValue) {
      return res.status(401).send({error: 'No token present'});
    }
    const [_, token] = headerValue.split(' ');

    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: 'Unauthorized'});
    }


    const trackHistoryData = new TrackHistory({
        'user': user._id,
        'track': req.body.track,
        'datetime': req.body.datetime,
      });

      await trackHistoryData.save();
      res.send(trackHistoryData);
  } catch (e) {
    next(e);
  }
});

export default trackHistoryRouter;