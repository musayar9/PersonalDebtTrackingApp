
const {StatusCodes} = require("http-status-codes")
const Message = require("../models/messageModel")

const addMessage = async (req, res, next) => {
  const { chatId, senderId, text } = req.body;

  const newMessage = new Message({
    chatId,
    senderId,
    text,
  });

  try {
    const message = await newMessage.save();
    res.status(StatusCodes.OK).json(message);
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  const { chatId } = req.params;
  try {
    const message = await Message.find({ chatId });
    res.status(StatusCodes.OK).json(message);
  } catch (error) {
    next(error);
  }
};

module.exports = { addMessage, getMessages };
