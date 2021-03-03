import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import db from "../models/db";
import generateToken from "../middlewares/generateToken";
import { insertUser, userDetails } from "../models/userQuery";


dotenv.config();

class User {
  static async userSignup(req, res) {
    try {
      const { email, name, password } = req.body;

      const userEmail = await db.query(userDetails, [email]);

      if (userEmail.rows.length) {
        return res.status(409).json({
          status: 409,
          error: "Email is already registered"
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const values = [email, name, hashedPassword];

      const result = await db.query(insertUser, values);

      return res.status(201).json({
        status: 201,
        message: "Registration successful",
        data: {
          ...result.rows[0]
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

      const userEmail = await db.query(userDetails, [email]);

      if (!userEmail.rows.length) {
        return res.status(400).json({
          status: 400,
          error: "invalid email or password"
        });
      }

      const userPassword = await bcrypt.compare(
        password,
        userEmail.rows[0].password
      );

      if (!userEmail.rows[0] || userPassword === false) {
        return res.status(400).json({
          status: 400,
          error: "invalid email or password"
        });
      }


      const rows = userEmail;
      const { id, name } = rows.rows[0];
      const token = generateToken(
        rows.rows[0].id,
        rows.rows[0].email,
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

export default User;
