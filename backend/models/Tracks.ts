import mongoose, { Types } from 'mongoose';
import Albums from './Albums';

const Schema = mongoose.Schema;

const TracksSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  sequence: {
    type: Number,
    required: true,
  },
  isPublished:{
    type: Boolean,
    required: true,
    default: false
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Albums',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Albums.findById(value),
      message: 'Album does not exist!',
    }
  }
});

const Tracks = mongoose.model('Tracks', TracksSchema);


export default Tracks;