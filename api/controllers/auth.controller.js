import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// google OAuth

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(user);
    } else {
      const newUser = new User({
        username: req.body.username,

        email: req.body.email,

        /*.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-2), */
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(user);
    }
  } catch (error) {
    next(error);
  }
};

//signout
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("asscess_token");
    res.status(200).json("User has been logged out");
  } catch (error) {
    next(error);
  }
};
