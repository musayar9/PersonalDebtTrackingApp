const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const { StatusCodes } = require("http-status-codes");
const {BadRequestError} = require("../errors");

const createChat = async (req, res, next) => {

  const { senderId, receiverId } = req.body;
  const newChat = new Chat({
    members: [senderId, receiverId],
  });

  try {
    const chat = await newChat.save();
    res.status(StatusCodes.OK).json(chat);
  } catch (error) {
    next(error);
  }
};

const userChats = async (req, res, next) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    }).sort({ updatedAt: -1 });
    res.status(StatusCodes.OK).json(chat);
  } catch (error) {
    next(error);
  }
};

const findChat = async (req, res, next) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    res.status(StatusCodes.OK).json(chat);
  } catch (error) {
    next(error);
  }
};


const deleteChat = async(req, res,next) => {
  const {chatId} = req.params;

  const isChat = Chat.findById({_id:chatId});
    if(!isChat){
        return BadRequestError("Chat not found");
    }
  try {
    const chat = await Chat.findByIdAndDelete({_id:chatId});
    const messages = await Message.deleteMany({chatId:chat._id});
    res.status(StatusCodes.OK).json(chat);
  } catch (error) {
    next(error);
  }
}

module.exports = { createChat, userChats, findChat, deleteChat };
