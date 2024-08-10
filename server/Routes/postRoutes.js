import express from "express";
import {getAllPosts, getPost, addPost, updatePost, deletePost} from '../Controllers/postController.js'
const router = express.Router();
router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
export default router;