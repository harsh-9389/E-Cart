import express from "express";
import { requireSignin, isAdmin } from "../middlewares/authMiddleware.js";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";

// Routing
const router = express.Router();

// Register || method : Post
router.post("/register", registerController);

// Login || method : Post
router.post("/login", loginController);

//Forgot Password
router.post("/forgot-password", forgotPasswordController);

//test route
router.get("/test", requireSignin, isAdmin, testController);

//Protected route
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
