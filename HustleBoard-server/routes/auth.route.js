import express from "express";
const authRouter = express.Router();
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

authRouter.post("/v1/auth/register", (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = await new User({ name, email, password: hash });
        user.save();
        res.status(201).json({ message: "sign up successfull ", user });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.post("/v1/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(404).json({ message: "Something Went wrong" });
    }
    bcrypt.compare(password, existingUser.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { id: existingUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" },
        );
        res
          .status(200)
          .json({
            name :  existingUser.name,
            token : token,
            message: "login Successfull,Redirecting to dashboard...",
            existingUser,
          });
      } else {
        res.status(404).json({ message: "Something Went wrong" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

export default authRouter;
