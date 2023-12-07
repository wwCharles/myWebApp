import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    imageUrls: {
      type: Array,
      required: true,
    },

    location: {
      type: String,
    },
    caption: {
      type: String,
    },
    likes: {
      type: Number,
    },
    dislikes: {
      type: Number,
    },
    redflag: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
