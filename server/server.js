import express from "express"
import * as path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {UsersApi} from "./routes/UsersApi.js";
import {CategoryApi} from "./routes/CategoryApi.js";
import {CompanyApi} from "./routes/CompanyApi.js";

dotenv.config()
const mongoUri = process.env.MONGO_URI;
const database = process.env.MONGO_DATABASE;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

//Routes and mongodb
    app.use("/api/users", UsersApi("test"));
    app.use("/api/categories", CategoryApi("test"))
    app.use("/api/companies", CompanyApi("test"))

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