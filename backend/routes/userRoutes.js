import express from "express";
import { protect } from "../middleWare/authMiddleware.js";
import {
   authUser,
   getUserProfile,
   registerUser,
   updateUserProfile,
} from "../controllers/userController.js";
const router = express.Router();

//Fetch all products
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
