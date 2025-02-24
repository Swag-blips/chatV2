import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: {
        $ne: loggedInUserId,
      },
    });
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(
      `an error occured in getUsersFor sidebar controller ${error.message}`
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  const { id: userToChatId } = req.params;

  try {
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        {
          senderId: senderId,
          receiverId: userToChatId,
        },
        {
          senderId: userToChatId,
          receiverId: senderId,
        },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error(
      `an error occured in getMessages controller ${error.message}`
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;

    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(
      `an error occured in send message controller ${error.message}`
    );
    res.status(500).json({ error: "Internal server error" });
  }
};
