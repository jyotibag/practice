import { Router } from "express";
const router = Router();
import {
  validateDynamic,
  validatePostForm,
} from "../middlewares/postMiddleware.js";
import { addPost, allPosts } from "../controllers/posts/postController.js";

router
  .route(`/posts`)
  //   .post([validatePostForm, validateDynamic], addPost)
  .post(validateDynamic, addPost)
  .get(allPosts);

export default router;
