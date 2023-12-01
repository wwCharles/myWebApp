import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userRef: {
      type: Array,
      required: true,
    },
    postRef: {
      type: String,
      requuired: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", postSchema);

export default Comment;
