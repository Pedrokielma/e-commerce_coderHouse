import ChatModel from '../models/chat.model.js';


export default class ChatManager {
  async getMessages() {
    try {
      const chatQuery = await ChatModel.find();
      return chatQuery;
    } catch (err) {
      throw new Error(err.message || 'Failed to get products');
    }
  }

  async addMessage(newMessage) {
    try {
      // Validate required fields
      const { user, content } = newMessage;
      if (!user || !content ) {
        return { message: 'Missing obligatory fields', status: 400 };
      }

      // Create new product instance
      const message = new ChatModel(newMessage);

      // Save product to the database
     const res = await message.save();

    

      return { message: `message added successfully`, status: 200 };
    } catch (err) {
      throw new Error(err.message || 'Failed to add product');
    }
  }
 

}