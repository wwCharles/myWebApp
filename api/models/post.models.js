import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      requuired: true,
    },
    location: {
      type: String,
    },
    caption: {
      type: String,
    },
    comments: {
      type: Array,
    },
    likes: {
      type: Array,
    },
    onepercent: {
      type: Boolean,
    },
    redflag: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
