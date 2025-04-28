const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    senderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        refPath: 'senderModel'
    },
    senderModel: { 
        type: String, 
        required: true, 
        enum: ['User', 'User2'] 
    },
    receiverId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        refPath: 'receiverModel'
    },
    receiverModel: { 
        type: String, 
        required: true, 
        enum: ['User', 'User2'] 
    },
    conversationId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Conversation", 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    isRead: { 
        type: Boolean, 
        default: false 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
});

const conversationSchema = new mongoose.Schema({
    participants: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'participants.userModel' },
        userModel: { type: String, required: true, enum: ['User', 'User2'] }
      }
    ],
    lastMessage: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Message", 
      default: null 
    },
    lastUpdated: { 
      type: Date, 
      default: Date.now 
    },
  });
  

const Conversation = mongoose.model("Conversation", conversationSchema);
const Message = mongoose.model("Message", MessageSchema);

module.exports = { Message, Conversation };
