const Chat = require("../models/chatModel");

const { StatusCodes } = require("http-status-codes");
const createChat = async (req, res, next) => {
  console.log(req.body);
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

module.exports = { createChat, userChats, findChat };
