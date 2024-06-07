import mongoose from 'mongoose';


const chatSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [],
});


export default mongoose.models.Chat || mongoose.model('Chat', chatSchema);

