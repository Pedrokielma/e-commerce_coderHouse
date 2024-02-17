import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  content:  {
      type: String,
      required: true,
    },
});

const Chat = mongoose.model('Messages', chatSchema);

export default Chat;