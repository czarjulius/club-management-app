import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import generateToken from "../middlewares/generateToken";
import {User} from "../db/models";


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

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          name, password:hashedPassword
        }
      });

      if (!created) {
        return res.status(409).json({
          status: 409,
          error: "Email is already registered"
        });
      }

      return res.status(201).json({
        status: 201,
        message: "Registration successful",
        data: {
          name: user.dataValues.name,
          email: user.dataValues.email
        }
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

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({
          status: 400,
          error: "invalid email or password"
        });
      }

      const userPassword = await bcrypt.compare(
        password,
        user.dataValues.password
      );
      console.log(userPassword);


      if (!user.dataValues || userPassword === false) {
        return res.status(400).json({
          status: 400,
          error: "invalid email or password"
        });
      }


      const { id, name } = user.dataValues;
      const token = generateToken(
        user.dataValues.id,
        user.dataValues.email,
      );
      return res
        .header("token", token)
        .status(200)
        .json({
          status: 200,
          message: "Login successful",
          data: {
            token,
            id,
            name,
            email,
          }
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
