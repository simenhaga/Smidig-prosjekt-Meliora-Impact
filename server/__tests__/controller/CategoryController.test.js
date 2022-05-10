import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { CategoryController } from "../../routes/CategoryController";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { CategoryService } from "../../service/CategoryService";

const app = express();
app.use(bodyParser.json());
app.use("/", CategoryController);

const testCategory = {
  name: "Test category",
};

describe("Category controller", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  it("fetches categories", async () => {
    const category = await CategoryService.insert(testCategory);
    const response = await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(expect.arrayContaining([testCategory]))
      .expect(200);
    expect(response.body).toEqual(expect.arrayContaining([testCategory]));
  });

  it("inserts a category", async () => {
    await request(app)
      .post("/")
      .send(testCategory)
      .expect("Content-Type", /json/)
      .expect(testCategory)
      .expect(200);
  });

  it("returns 400 on duplicate category insert", async () => {
    await request(app).post("/").send(testCategory);
    await request(app).post("/").send(testCategory).expect(400);
  });
});
