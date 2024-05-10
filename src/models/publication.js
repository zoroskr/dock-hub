import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  year: Number,
  description: String,
  image: String
});

export default mongoose.models.Publication || mongoose.model('Publication', schema);