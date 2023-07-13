import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protect routes
export const requireSignIn = async (req, res, next) => {
  try {
    const decoded = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ success: false, message: "Token expired" });
  }
};

//admin middleware
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res
        .status(403)
        .send({ success: false, message: "Admin resource access denied" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in admin middleware" });
  }
};
