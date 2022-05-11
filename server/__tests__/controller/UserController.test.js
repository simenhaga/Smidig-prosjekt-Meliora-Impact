import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { UserController } from "../../routes/UserController";
import { UserService } from "../../service/UserService";
import { CompanyService } from "../../service/CompanyService";

const app = express();
app.use(bodyParser.json());
app.use("/", UserController());

describe("User controller", () => {
  const testUser = {
    name: "Test User",
    email: "test@email.com",
    googleToken: "testToken",
  };

  const secondTestUser = {
    name: "Test User 2",
    email: "test2@email.com",
    googleToken: "testToken2",
  };

  const noTokenUser = {
    name: "Test User 2",
    email: "test3@email.com",
  };

  it("gets all users", async () => {
    await UserService.insert(testUser);
    const response = await request(app)
      .get("/all")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body.all).toEqual(
      expect.arrayContaining([expect.objectContaining(testUser)])
    );
  });

  it("create a user", async () => {
    const result = await request(app)
      .post("/createFromGoogle")
      .send(secondTestUser)
      .expect(201)
      .expect("Content-Type", /json/);
    expect(result.body).toEqual(expect.objectContaining(secondTestUser));
  });

  it("try to create user that exists already", async () => {
    await UserService.insert(secondTestUser);
    const result = await request(app)
      .post("/createFromGoogle")
      .send(secondTestUser)
      .expect(400)
      .expect("Content-Type", /json/);
    expect(result.body).toEqual(expect.objectContaining(result.body));
  });

  it("try to create user without googleToken", async () => {
    const result = await request(app)
      .post("/createFromGoogle")
      .send(noTokenUser)
      .expect(400)
      .expect("Content-Type", /json/);
    expect(result.body).toEqual(expect.objectContaining(result.body));
  });

  it("updates a user by email", async () => {
    await UserService.insert(testUser);
    await request(app)
      .put("/updateFromGoogle")
      .send({ email: testUser.email, updated: "Updated name" })
      .expect(201);

    expect(await UserService.find()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Updated name" }),
      ])
    );
  });

  it("400 status code when updating user", async () => {
    await UserService.insert(testUser);
    await request(app)
      .put("/updateFromGoogle")
      .send({ email: "fake", updated: "Updated name" })
      .expect(400);
  });

  it("200 status code when deleting user", async () => {
    await UserService.insert(testUser);
    await request(app)
      .delete("/deleteFromGoogle")
      .send({ email: testUser.email })
      .expect(200);
  });
});
