const mongoose = require("mongoose");
const messageScheme = new mongoose.Schema(
  {
    chatId: { type: String },
    senderId: { type: String },
    text: { type: String },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageScheme);

module.exports = Message;
