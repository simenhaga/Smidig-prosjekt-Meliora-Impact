import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { LoginController } from "../../routes/LoginController";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser("Test_secret"));
app.use("/", LoginController());

describe("Login controller", () => {
  let agent = request.agent(app);
  it("should return 403 on get without token", async () => {
    await agent.get("/").expect(403);
  });

  it("should return google login info with token", async () => {
    //throw new Error("Test not implemented");
  });

  it("should delete cookie on delete to login", async () => {
    //throw new Error("Test not implemented");
  });

  it("should sign cookies on post login", async () => {
    const access_token = "asdfasdfasdfad";
    await agent.post("/").send(access_token).expect(200);
    //throw new Error("Not testing if cookie is signed!");
  });
});
