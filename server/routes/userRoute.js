import { Router } from "express";
const router = Router();
import {
  activateUser,
  addNewUser,
  allUsers,
  deactivateUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUser } from "../middlewares/userMiddleware.js";

router.get(`/all`, allUsers);
router.get(`/user/:uuid`, getUser);
router.post(`/add`, validateUser, addNewUser);
router.put(`/update/:userId`, validateUser, updateUser);
router.delete(`/delete/:userId`, deactivateUser);
router.post(`/activate/:userId`, activateUser);

export default router;
