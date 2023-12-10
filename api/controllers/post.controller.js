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

// export const getPosts = async (req, res, next) => {
//   try {
//     const limit = parseInt(req.query.limit) || 10;
//     const startIndex = parseInt(req.query.startIndex) || 0;

//     const searchTerm = req.query.searchTerm || "";
//     const sort = req.query.sort || "createdAt";
//     const order = req.query.order || "desc";

//     const posts = await Post.find()
//       .sort({ [sort]: order })
//       .limit(limit)
//       .skip(startIndex);

//     if (posts.length === 0) {
//       res.status(200).json(null);
//       return;
//     }

//     res.status(200).json(posts);
//   } catch (error) {
//     next(error);
//   }
// };

export const getPosts = async (req, res, next) => {
  const sort = req.query.sort || "createdAt";
  const order = req.query.order || "desc";
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const DEFAULT_LIMIT = 10;

  try {
    const posts = await Post.find({})
      .sort({ [sort]: order })
      .limit(DEFAULT_LIMIT)
      .skip(skip);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
    // res.status(400).json({
    //   error: `Error getting posts: ${error.message}`,
    // });
  }
};

export const getOnePercent = async (req, res, next) => {
  try {
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const DEFAULT_LIMIT = 10;

    const posts = await Post.find({ likes: { $gt: 10 } }) // Filter by likes greater than 100
      .sort({ [sort]: order })
      .limit(DEFAULT_LIMIT)
      .skip(skip);

    res.status(200).json(posts);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
// export const getOnePercent = async (req, res, next) => {
//   try {
//     const limit = parseInt(req.query.limit) || 10;
//     const startIndex = parseInt(req.query.startIndex) || 0;

//     const searchTerm = req.query.searchTerm || "";
//     const sort = req.query.sort || "createdAt";
//     const order = req.query.order || "desc";

//     const posts = await Post.find({ likes: { $gt: 100 } }) // Filter by likes greater than 100
//       .sort({ [sort]: order })
//       .limit(limit)
//       .skip(startIndex);

//     if (posts.length === 0) {
//       res.status(200).json(null);
//       return;
//     }

//     res.status(200).json(posts);
//   } catch (error) {
//     next(error);
//   }
// };

export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(errorHandler(404, "post not found!"));
    }

    // Increment the likes counter
    post.likes = (post.likes || 0) + 1;

    // Save the updated post
    await post.save();

    //
    return res.status(200).json({
      success: true,
      // message: "Post liked successfully.",
      likes: post.likes,
    });
  } catch (error) {
    next(error);
  }
};

export const dislikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(errorHandler(404, "post not found!"));
    }

    // Increment the likes counter
    post.dislikes = (post.dislikes || 0) + 1;

    // Save the updated post
    await post.save();

    //
    return res.status(200).json({
      success: true,
      // message: "Post liked successfully.",
      dislikes: post.dislikes,
    });
  } catch (error) {
    next(error);
  }
};
// export const likePost = async (req, res, next) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     const user = await req.user.id;

//     if (!post) {
//       return next(errorHandler(404, "post not found!"));
//     }

//     if (post.likes.includes(user)) {
//       await Post.updateOne(post, { $pull: { likes: user } });

//       return res.status(200).json(false);
//     } else {
//       await Post.updateOne(post, { $push: { likes: user } });

//       return res.status(200).json(true);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export const flagPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(errorHandler(404, "post not found!"));
    }

    // Increment the likes counter
    post.redflag = (post.redflag || 0) + 1;

    // Save the updated post
    await post.save();

    //
    return res.status(200).json({
      success: true,
      // message: "Post liked successfully.",
      redflag: post.redflag,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(errorHandler(404, "post not found!"));
  }

  // if (req.user.id !== post.userRef) {
  //   return next(errorHandler(401, "You can only delete your own post!"));
  // }

  try {
    await Post.findByIdAndDelete(post._id);
    res.status(200).json(true);
  } catch (error) {
    next(error);
  }
};
