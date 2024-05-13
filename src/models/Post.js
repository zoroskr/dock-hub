import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  owner: String,
});

export default mongoose.models.Post || mongoose.model('Post', schema);