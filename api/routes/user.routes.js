import express from "express";
import {
  deleteUser,
  friendStat,
  getAllUserPosts,
  getAllUsers,
  getUser,
  getUserPosts,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
// import { test } from "../controllers/user.controller.js";

const router = express.Router();

// router.get("/test", test);
router.get("/all", getAllUsers);
router.get("/get/:id", verifyToken, getUser);
router.get("/friend/:id", verifyToken, friendStat);

router.post("/update/:id", verifyToken, updateUser);
router.get("/posts/:id", verifyToken, getUserPosts);
router.get("/getuserpost/:id", verifyToken, getAllUserPosts);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
