import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    imageUrls: {
      type: Array,
      required: true,
    },
    // userRef: {
    //   type: String,
    //   requuired: true,
    // },
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
    // onepercent: {
    //   type: Boolean,
    // },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
