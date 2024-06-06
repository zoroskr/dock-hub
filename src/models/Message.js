import mongoose from 'mongoose';


const schema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
export default mongoose.models.Message || mongoose.model('Message', schema);
