import mongoose, { Types } from 'mongoose';
import User from './User';
import Tracks from './Tracks';
import { TrackHistoryMutation } from '../types';


const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist!',
    }
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: 'Tracks',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Tracks.findOne(value),
      message: 'Track does not exist!'
    }
  },
  datetime: {
    type: Date,
    required: true,
    default: Date.now,
  }
});


const TrackHistory = mongoose.model<TrackHistoryMutation>('TrackHistory', TrackHistorySchema);

export default TrackHistory;