import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  owner: String,
});

export default mongoose.models.Publication || mongoose.model('Post', schema);