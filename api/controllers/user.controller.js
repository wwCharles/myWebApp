import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Post from "../models/post.models.js";
import { errorHandler } from "../utils/error.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find(req._id);
    res.status(200).json(allUsers.length);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const posts = await Post.find({ userRef: req.params.id });
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "getUserPost Error"));
  }
};

export const getAllUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ userRef: req.params.id });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const friendStat = async (req, res, next) => {
  try {
    const user1 = await User.findById(req.user.id);
    const user2 = await req.params.id;

    if (user1.friends.includes(user2)) {
      await User.updateOne(user1, { $pull: { friends: user2 } });
      return res.status(200).json(false);
    } else {
      await User.updateOne(user1, { $push: { friends: user2 } });
      return res.status(200).json(true);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "user can only delete your own account"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json(true);
  } catch (error) {
    next(error);
  }
};
