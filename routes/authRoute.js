import express from "express";
import { requireSignin, isAdmin } from "../middlewares/authMiddleware.js";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";

// Routing
const router = express.Router();

// Register || method : Post
router.post("/register", registerController);

// Login || method : Post
router.post("/login", loginController);

//test route
router.get("/test", requireSignin, isAdmin, testController);

//Protected route
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
