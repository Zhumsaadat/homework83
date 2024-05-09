import express from 'express';
import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';


const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    if (!user) {
      return res.status(403).send({ error: 'Wrong token!' });
    }

      const userId = user._id.toString();
      const tracksHistory = await TrackHistory.find({user: userId}).populate('track');

      return res.send(tracksHistory);
  } catch (err) {
    return next(err);
  }
});

trackHistoryRouter.post('/', auth,  async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const trackHistoryData = new TrackHistory({
        'user': user?._id,
        'track': req.body.track,
        'datetime': Date.now(),
      });

      await trackHistoryData.save();
      res.send(trackHistoryData);
  } catch (e) {
    next(e);
  }
});

export default trackHistoryRouter;