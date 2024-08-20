const express = require("express");
const {
  createChat,
  findChat,
  userChats,
    deleteChat
} = require("../controllers/chatController");
const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);
router.delete("/:chatId", deleteChat);

module.exports = router;
