import Post from "../models/post.models.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(errorHandler(404, "post not found!"));
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const posts = await Post.find()
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await req.user.id;

    if (!post) {
      return next(errorHandler(404, "post not found!"));
    }

    if (post.likes.includes(user)) {
      await Post.updateOne(post, { $pull: { likes: user } });

      return res.status(200).json(false);
    } else {
      await Post.updateOne(post, { $push: { likes: user } });

      return res.status(200).json(true);
    }
  } catch (error) {
    next(error);
  }
};
export const flagPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await req.user.id;

    if (!post) {
      return next(errorHandler(404, "post not found!"));
    }

    if (post.redflag.includes(user)) {
      await Post.updateOne(post, { $pull: { redflag: user } });

      return res.status(200).json(false);
    } else {
      await Post.updateOne(post, { $push: { redflag: user } });

      return res.status(200).json(true);
    }
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(errorHandler(404, "post not found!"));
  }

  if (req.user.id !== post.userRef) {
    return next(errorHandler(401, "You can only delete your own post!"));
  }

  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json(true);
  } catch (error) {
    next(error);
  }
};
