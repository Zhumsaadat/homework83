import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArtistsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  info: String,
  isPublished:{
    type: Boolean,
    required: true,
    default: false
  }
});

const Artists = mongoose.model('Artists', ArtistsSchema);


export default Artists;