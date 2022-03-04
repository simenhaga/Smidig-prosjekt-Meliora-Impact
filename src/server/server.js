import express from "express";
import dotenv from "dotenv";

//Dev server for serving JSON data from a mock database

dotenv.config();
const app = express();

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
