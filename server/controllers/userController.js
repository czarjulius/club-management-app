import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../db/models/user";
import generateToken from "../middlewares/generateToken";
import { insertUser, userDetails } from "../models/userQuery";


dotenv.config();

class UserController {
  static async userSignup(req, res) {
    try {
      const { email, name, password } = req.body;

      if (!email || !name || !password ) {
        return res.status(400).json({
          status: 400,
          error: "Kindly fill out all inputs fields"
        });
      }

      await User.findOne({ email }, async(err, user) =>{
        if (user){
          return res.status(409).json({
            status: 409,
            error: "Email is already registered"
          });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        User.create({ email, name, password: hashedPassword }, (err, user)=> {
          return res.status(201).json({
            status: 201,
            message: "Registration successful",
            data: {
              id: user._doc._id,
              name: user._doc.name,
              email: user._doc.email
            }
          });
        });
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password ) {
        return res.status(400).json({
          status: 400,
          error: "Kindly fill out all inputs fields"
        });
      }

      await User.findOne({ email }, async(err, user) =>{
        if (!user){
          return res.status(400).json({
            status: 400,
            error: "invalid email or password"
          });
        }

        const userPassword = await bcrypt.compare(
          password,
          user._doc.password
        );

        if (!user._doc || userPassword === false) {
          return res.status(400).json({
            status: 400,
            error: "invalid email or password"
          });
        }

        const token = generateToken(
          user._doc._id,
          user._doc.email,
        );

        return res.header("token", token).status(200).json({
          status: 200,
          message: "Login successful",
          data: {
            token,
            id: user._doc._id,
            name: user._doc._id,
            email,
          }
        });
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }
}

export default UserController;
