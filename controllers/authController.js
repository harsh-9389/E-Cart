import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";

// register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //check if user already exists
    const exist_user = await userModel.findOne({ email });
    if (exist_user) {
      return res
        .status(200)
        .send({ success: false, message: "User already exists please login" });
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    //save user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res
      .status(201)
      .send({ success: true, message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in resistration",
      error: error.message,
    });
  }
};

// login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email is not registered",
      });
    }

    //check if password is correct
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "wrong email or password",
      });
    }

    //create token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    //send token in cookie
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   maxAge: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    // });

    //send response
    res.status(200).send({
      success: true,
      message: "user logged in successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error: error.message,
    });
  }
};

// test controller
export const testController = (req, res) => {
  res.send("Protected route");
};
