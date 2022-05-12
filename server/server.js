import express from "express";
import * as path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { UserController } from "./routes/UserController.js";
import { CategoryController } from "./routes/CategoryController.js";
import { CompanyController } from "./routes/CompanyController.js";
import mongoose from "mongoose";
import { LoginController } from "./routes/LoginController.js";

dotenv.config();
mongoose.connect(
  process.env.MONGO_URI,
  () => {
    console.log("Connected to MongoDB");
  },
  (e) => console.error(e)
);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

//Routes
app.use("/api/user", UserController());
app.use("/api/category", CategoryController());
app.use("/api/company", CompanyController());
app.use("/api/login", LoginController());

//Setting up and starting the server
app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});
const server = app.listen(process.env.PORT || 3000, (error) => {
  if (!error) {
    console.log(`Started on http://localhost:${server.address().port}`);
  } else {
    console.log("Error when starting server: " + error);
  }
});
