import mongoose, { Types } from 'mongoose';
import Artists from './Artists';

const Schema = mongoose.Schema;

const AlbumsSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
  },
  image: String,
  singer: {
    type: Schema.Types.ObjectId,
    ref: 'Artists',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Artists.findById(value),
      message: 'Artist does not exist!',
    }
  }
});

const Albums = mongoose.model('Albums', AlbumsSchema);


export default Albums;