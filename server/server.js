import express from "express";
import * as path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
import { UserController } from "./routes/UserController.js";
import { CategoryController } from "./routes/CategoryController.js";
import { CompanyController } from "./routes/CompanyController.js";

dotenv.config();
const mongoUri = process.env.MONGO_URI;
const database = process.env.MONGO_DATABASE;
const mongoClient = new MongoClient(mongoUri);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

//Routes and mongodb

mongoClient.connect().then(async (error) => {
  console.log("Connected to database");
  app.use("/api/users", UserController(mongoClient.db(database || "meloria")));
  app.use(
    "/api/categories",
    CategoryController(mongoClient.db(database || "meloria"))
  );
  app.use(
    "/api/companies",
    CompanyController(mongoClient.db(database || "meloria"))
  );
});

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
