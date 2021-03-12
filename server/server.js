import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/index";
import {db_connection} from './db/config/config'

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send(" Welcome To Club Manager");
});

app.use("*", (req, res) =>
  res.status(404).json({
    status: "404",
    message: "route not found"
  })
);

db_connection();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
