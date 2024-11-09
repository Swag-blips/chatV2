import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    const users = await User.find({
      clerkId: { $ne: currentUserId },
    });

    res.status(200).json(users);
  } catch (error) {
    console.log("An error occured in getAllUSers controller", error);
    next(error);
  }
};
