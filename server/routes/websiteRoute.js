import { Router } from "express";
const router = Router();
import { getTopLocations } from "../controllers/masters/locationController.js";
import { getAllCategories, getCategories } from "../controllers/masters/categoryController.js";

router.get(`/top-locations`, getTopLocations);
router.get(`/get-categories`, getCategories);
router.get(`/all-categories`, getAllCategories);

export default router;
