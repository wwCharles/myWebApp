import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  deletePost,
  flagPost,
  getPost,
  getPosts,
  likePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/get/:id", getPost);
router.get("/get", getPosts);
router.get("/like/:id", verifyToken, likePost);
router.get("/flag/:id", verifyToken, flagPost);
router.delete("/delete/:id", verifyToken, deletePost);

export default router;
