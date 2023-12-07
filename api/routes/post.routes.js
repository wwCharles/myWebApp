import express from "express";
// import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  deletePost,
  dislikePost,
  flagPost,
  getOnePercent,
  getPost,
  getPosts,
  likePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/get/:id", getPost);
router.get("/get", getPosts);
router.get("/getOnePercent", getOnePercent);
router.get("/like/:id", likePost);
router.get("/dislike/:id", dislikePost);
router.get("/flag/:id", flagPost);
router.delete("/delete/:id", deletePost);

export default router;
